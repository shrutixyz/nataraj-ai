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
  const [isUnityLoaded, setisUnityLoaded] = useState(false);

  const [isPlaying, setisPlaying] = useState(false);
  const [isReset, setisReset] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(function () {
    if (isLoaded)
    {
      console.log("unity", isLoaded);
      sendStepSequence();
      setisUnityLoaded(isLoaded);
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

  
  const handleTimeUpdate =  () => {
    console.log("audio: ", currentTime)
    if ((currentTime> nextTimeStamp))
    {
      console.log("time:", currentTime, nextTimeStamp, currentTime> nextTimeStamp)
      const idx = timeStampList.indexOf(nextTimeStamp);
      if (idx + 1 < timeStampList.length)
      {
        setnextTimeStamp(timeStampList[idx+1])
      }
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

  const handleReset = () => {
    if (audio)
    {
      const playState = 2;
      setisPlaying(true);
      audio.currentTime = 0;
      audio.play()
      sendMessage("Michelle@Idle", "ControlPlayState", playState);
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
      // const res = await axios.get(`${endpoint}/fetchproject/${projectId}`);
      const proj = {
        "avatar": "",
        "choreography": "```json\n{\n  \"0.00\": {\"lyrics\": \"We could leave the Christmas lights up till January\", \"step\": \"Step right, step left, arms out to the side\"},\n  \"4.33\": {\"lyrics\": \"This is our place, we made the rules\", \"step\": \"Arms up, clap, clap, step right\"},\n  \"8.75\": {\"lyrics\": \"And there's a dazzling haze, a recent\", \"step\": \"Spin, point right, point left\"}\n}\n```",
        "danceform": "Freestyle, ",
        "duration": 16.966,
        "loading": 0,
        "owner": "CPJ1kLB2Bud9CQWMcepUVnH84xE2",
        "projectID": "7io40rh",
        "projectName": "luminous orangutan",
        "song": "https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-7io40rh.mp3",
        "state": 2,
        "title": "Taylor Swift - Lover (Lyrics).mp3",
        "visibility": "private"
    }
    setProject(proj)
      // setProject(res.data["project"])
      
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
      let tempAudio = new Audio(project.song);
      setAudio(tempAudio);

      const updateCurrentTime = () => {
        setCurrentTime(tempAudio.currentTime);
    };

      // attach event listener
      tempAudio.addEventListener('timeupdate', updateCurrentTime);

      // Cleanup event listener and pause audio when component unmounts or URL changes
    //   return () => {
    //     tempAudio.removeEventListener('timeupdate', updateCurrentTime);
    //     tempAudio.pause();
    //     setCurrentTime(0); // Reset the time
    // };
    }
  }, [project]);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    console.log("loading", isAPILoading, !isLoaded, isAPILoading || !isLoaded);
  }, [isAPILoading, isLoaded]);

  useEffect(() => {
    handleTimeUpdate();
  }, [currentTime]);

  function handlePlayPause()
  {
    let playState;
    if (!isReset)
    {
      playState = 2;
      setisReset(!isReset);
      setisPlaying(true);
      audio?.play();
    } 
    else
    {
      playState = isPlaying ? 0 : 1
      setisPlaying(!isPlaying);
      if(playState)
      {
        audio?.play();
      } else {
        audio?.pause();
      }
    } 
    sendMessage("Michelle@Idle", "ControlPlayState", playState);
  }

  function sendStepSequence()
  {
    sendMessage("Michelle@Idle", "SetStepSequence", "1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20");
  }

  return <>
    <Nav></Nav>
    {isAPILoading? <div className={Styles.loading}>
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
    <button disabled={!isUnityLoaded} onClick={handlePlayPause}>Play/Pause</button>
    <button disabled={!isUnityLoaded} onClick={handleReset}>Reset</button>

    {/* <audio id="player" onTimeUpdate={e => handleTimeUpdate(e)} src={project.song} controls></audio> */}
    <p>{currentLyrics}</p>

    </div>}
  </>
}

export default Project;