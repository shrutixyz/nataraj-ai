import Styles from "./Project.module.css"

import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Nav from "../../features/nav/Nav";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../../assets/loader.svg";

function Project() {
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
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
  const [currentLyrics, setcurrentLyrics] = useState("");
  const [isAPILoading, setisAPILoading] = useState(true);
  const [isPlaying, setisPlaying] = useState(false);
  const [isReset, setisReset] = useState(false);


  useEffect(function () {
    if (isLoaded)
    {
      sendStepSequence();
    }  
  }, [isLoaded]);




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
    console.log("time:", e.currentTarget.currentTime, nextTimeStamp, e.currentTarget.currentTime> nextTimeStamp)
    if (e.currentTarget.currentTime> nextTimeStamp)
    {
      const idx = timeStampList.indexOf(nextTimeStamp);
      if (idx + 1 < timeStampList.length)
      {
        setnextTimeStamp(timeStampList[idx+1])
      }
      console.log("lyrics: ", idx, lyricsList[idx])
      setcurrentLyrics(lyricsList[idx]);
    } 
  }

  const resetNextTimestamp  = (currentTimestamp: number) => {
    const tempTimestamp = findNextGreatest(timeStampList, currentTimestamp);
    if (tempTimestamp != -1)
    {
      setnextTimeStamp(tempTimestamp)
    }
  }

  function findNextGreatest(arr: number[] | any[], num: number) {
    // Find the index of the given number
    const index = arr.indexOf(num);
  
    // If the number is not found or it's the last element, return -1
    if (index === -1 || index === arr.length - 1) {
      return -1;
    }
  
    // Iterate through the array from the next index to find the first greater number
    for (let i = index + 1; i < arr.length; i++) {
      if (arr[i] > num) {
        return arr[i];
      }
    }
  
    // If no greater number is found, return -1
    return -1;
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
      setnextTimeStamp(timeStamp[1]);
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
      setisAPILoading(false);
    }
  }, [project]);

  useEffect(() => {
    console.log("project id: ", projectId);
    fetchProject();
  }, []);

  useEffect(() => {
    console.log("loading", isAPILoading);
  }, [isAPILoading]);

  function handlePlayPause()
  {
    let playState;
    if (!isReset)
    {
      playState = 2;
      setisReset(!isReset);
      setisPlaying(true);
    } 
    else
    {
      playState = isPlaying ? 0 : 1
      setisPlaying(!isPlaying);
    } 
    sendMessage("Michelle@Idle", "ControlPlayState", playState);
  }

  function sendStepSequence()
  {
    sendMessage("Michelle@Idle", "SetStepSequence", "1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20");
  }

  return <>
    <Nav></Nav>
    {isAPILoading && isLoaded? <div className={Styles.loading}>
        <img src={loader} className={Styles.loader} alt="" />
        <p>loading your projects</p>
        </div> :
    <div>
    <p className={Styles.subtitle}>{project?.projectName}</p>
    <div className={Styles.container}>
        <Unity unityProvider={unityProvider} style={{
            width: '50vw',
            height: '50vh',
            }}
        />
    </div>
    <button onClick={handlePlayPause}>Play/Pause</button>
    <audio id="player" onTimeUpdate={e => handleTimeUpdate(e)} src={project.song} controls></audio>
    <p>{currentLyrics}</p>

    </div>}
  </>
}

export default Project;