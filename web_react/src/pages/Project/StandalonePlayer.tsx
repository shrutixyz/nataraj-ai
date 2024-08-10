import Styles from "./Project.module.css";

import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Nav from "../../features/nav/Nav";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../../assets/loader.svg";
import { timeStamp } from "console";
import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import resetIcon from "../../assets/reset.svg";
import googleplay from "../../assets/googleplay.png";
import quote from "../../assets/quote.svg";

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
  const { projectId } = useParams();

  const [project, setProject] = useState<any>(null);
  const [nextTimeStamp, setNextTimeStamp] = useState(0.0);
  const [timeStampList, setTimeStampList] = useState<number[]>([0.0]);
  const [lyricsList, setLyricsList] = useState<string[]>([""]);
  const [currentLyrics, setCurrentLyrics] = useState("");
  const [isAPILoading, setIsAPILoading] = useState(true);
  const [isUnityLoaded, setIsUnityLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [widthProgressBar, setWidthProgressBar] = useState(0.0);
  const [isEnded, setIsEnded] = useState(false);
  const [stepSequence, setstepSequence] = useState("1_2_3_5");


  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (isLoaded && !isAPILoading) {
      console.log("unity", stepSequence);
      sendStepSequence();
      setIsUnityLoaded(isLoaded);
      setTimeout(()=>{document.getElementById("xyz")?.click()}, 4000)
    }

    if (isEnded) {
      handleReset(false);
      setIsReset(true);
    }

    if (currentTime === 0) {
      setCurrentLyrics(lyricsList[0]);
      setNextTimeStamp(timeStampList[1]);
    } else {
      handleTimeUpdate();
    }

    console.log("loading", isAPILoading, !isLoaded, isAPILoading || !isLoaded);
  }, [isLoaded, isAPILoading, isEnded, currentTime]);

  useEffect(() => {
    if (project) {
      setIsAPILoading(false);
      const tempAudio = new Audio(project.song);

      const updateCurrentTime = () => setCurrentTime(tempAudio.currentTime);
      const updateDuration = () => {
        setDuration(tempAudio.duration);
        extractLyricsJSON(tempAudio.duration);
      };

      tempAudio.addEventListener("timeupdate", updateCurrentTime);
      tempAudio.addEventListener("loadedmetadata", updateDuration);
      tempAudio.addEventListener("ended", () => setIsEnded(true));

      return () => {
        tempAudio.removeEventListener("timeupdate", updateCurrentTime);
        tempAudio.removeEventListener("loadedmetadata", updateDuration);
        tempAudio.pause();
        setCurrentTime(0);
      };
    }
  }, [project]);

  function handleTimeUpdate() {
    if (currentTime > nextTimeStamp && currentTime !== 0) {
      const idx = timeStampList.indexOf(nextTimeStamp);
      if (idx + 1 < timeStampList.length) {
        setNextTimeStamp(timeStampList[idx + 1]);
      }
      setCurrentLyrics(lyricsList[idx]);
    }

    if (duration !== 0) {
      setWidthProgressBar((currentTime / duration) * 90);
    }
  }

  function handleReset(startPlaying: boolean) {
    setNextTimeStamp(timeStampList[1]);
    setCurrentLyrics(lyricsList[0]);
    setIsEnded(false);

  }

  async function fetchProject() {
    try {
      const res = await axios.get(`${endpoint}/fetchproject/${projectId}`);
      setProject(res.data["project"]);
      
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  }

  function extractLyricsJSON(durationtemp: number) {
    try {
      const firstIndex = project.choreography.indexOf("{");
      const lastIndex = project.choreography.lastIndexOf("}");
      const jsonString = project.choreography.substring(firstIndex, lastIndex + 1);
      const lyricsJSON = JSON.parse(jsonString);
      
      const newTimeStamp = spreadLyrics(
        Object.values(lyricsJSON).map((item: any) => item.lyrics),
        durationtemp
      );
      
      setTimeStampList(newTimeStamp);
      setLyricsList(Object.values(lyricsJSON).map((item: any) => item.lyrics));
      setNextTimeStamp(newTimeStamp[1]);
      setCurrentLyrics((Object.values(lyricsJSON)[0] as any).lyrics);
      setstepSequence((Object.values(lyricsJSON) as any).map((item: any) => item.steps).join("_"));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unable to fetch and parse lyrics or steps.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  }

  const spreadLyrics = (lyrics: string[], total_time: number): number[] => {
    const timestamps: number[] = [];
    const totalLength = lyrics.reduce((sum, lyric) => sum + lyric.length, 0);

    let currentTime = 0;
    for (let i = 0; i < lyrics.length; i++) {
      timestamps.push(currentTime);
      currentTime += (lyrics[i].length / totalLength) * total_time;
    }

    return timestamps;
  };

  function handlePlayPause() {
    const playState = !isReset ? 2 : isPlaying ? 0 : 1;
    setIsPlaying(!isPlaying);
    sendMessage("Michelle@Idle", "ControlPlayState", playState);
  }

  function sendStepSequence() {
    sendMessage("Michelle@Idle", "SetStepSequence", stepSequence);
  }

  return (
    <>
      <Unity
              unityProvider={unityProvider}
              style={{
                width: "100vw",
                height: "100vh",
              }}
              
            />
            <button id="xyz" onClick={()=>handlePlayPause()}></button>
    </>
  );
}

export default Project;