import Styles from "./Project.module.css"

import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Nav from "../../features/nav/Nav";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Project() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../../unity/unityProjects.loader.js",
    dataUrl: "../../unity/webgl.data",
    frameworkUrl: "../../unity/build.framework.js",
    codeUrl: "../../unity/build.wasm",
  });

  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [nextTimeStamp, setnextTimeStamp] = useState(0.00);
  const [timeStampList, settimeStampList] = useState([0.00]);
  const [lyricsList, setLyricsList] = useState([""]);
  const [currentLyrics, setcurrentLyrics] = useState("")

  const [project, setProject] = useState({
      "avatar": "",
      "choreography": "",
      "danceform": "",
      "duration": 0,
      "loading": 0,
      "owner": "",
      "projectID": "",
      "projectName": "",
      "song": "",
      "state": 0,
      "title": "",
      "visibility": ""
  });
  const { projectId } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate =  (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    
    if (e.currentTarget.currentTime > nextTimeStamp)
    {
      const idx = timeStampList.indexOf(nextTimeStamp);
      console.log("time: ", e.currentTarget.currentTime > nextTimeStamp, lyricsList, lyricsList[idx]);
      setnextTimeStamp(timeStampList[idx+1])
      setcurrentLyrics(lyricsList[idx]);
    }  

  }

  const extractLyricsJSON = () => {
    const firstIndex = project.choreography.indexOf("{")
    const lastIndex = project.choreography.lastIndexOf("}")
    // console.log(project.choreography.substring(firstIndex, lastIndex+1));
    const jsonString = project.choreography.substring(firstIndex, lastIndex+1);
    if (jsonString)
    {
      const lyricsJSON = JSON.parse(project.choreography.substring(firstIndex, lastIndex+1));
      const timeStamp: Float32List = Object.keys(lyricsJSON).map(e => parseFloat(e));
  
      // populate lyrics list
      const lyrics: string[] = Object.keys(lyricsJSON).map(e => lyricsJSON[e].lyrics);
      settimeStampList(timeStamp);
      setLyricsList(lyrics);
      setnextTimeStamp(timeStampList[1]);
      setcurrentLyrics(lyrics[0]);
    }
  }

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${endpoint}/fetchproject/${projectId}`);
      setProject(res.data["project"])

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  useEffect(() => {
    if (project) {
      extractLyricsJSON();
    }
  }, [project]);

  useEffect(() => {
    console.log("project id: ", projectId);
    fetchProject();
  }, []);

  return <>
    <Nav></Nav>
    <p className={Styles.subtitle}>{project?.projectName}</p>
    <div className={Styles.container}>
        <Unity unityProvider={unityProvider} style={{
            width: '50vw',
            height: '50vh',
            }}
        />
    </div>
    <audio id="player" onTimeUpdate={e => handleTimeUpdate(e)} src={project.song} controls></audio>
    <p>{currentLyrics}</p>
  </>
}

export default Project;