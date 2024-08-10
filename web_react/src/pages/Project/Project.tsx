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
  const [nextTimeStamp, setnextTimeStamp] = useState(0.0);
  const [timeStampList, settimeStampList] = useState([0.0]);
  const [lyricsList, setLyricsList] = useState([""]);
  const [currentLyrics, setcurrentLyrics] = useState("");
  const [isAPILoading, setisAPILoading] = useState(true);
  const [isUnityLoaded, setisUnityLoaded] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isReset, setisReset] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setduration] = useState(0);
  const [widthProgressBar, setwidthProgressBar] = useState(0.0);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [stepSequence, setstepSequence] = useState("1_2_3_4");
  const [project, setProject] = useState({
    avatar: "",
    choreography: "",
    danceform: "",
    duration: 0,
    loading: 0,
    owner: "",
    projectID: "",
    projectName: "",
    song: "",
    state: 0,
    title: "",
    visibility: "",
  });
  const { projectId } = useParams();

  useEffect(
    function () {
      if (isLoaded && !isAPILoading) {
        console.log("unity", isLoaded);
        sendStepSequence();
        setisUnityLoaded(isLoaded);
      }
    },
    [isLoaded]
  );

  useEffect(
    function () {
      if (isEnded) {
        handleReset(false);
        setisReset(true);
      }
    },
    [isEnded]
  );

  useEffect(
    function () {
      console.log("currentLyrics: ", currentLyrics);
    },
    [currentLyrics]
  );

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    console.log("loading", isAPILoading, !isLoaded, isAPILoading || !isLoaded);
  }, [isAPILoading, isLoaded]);

  useEffect(() => {
    handleTimeUpdate();
    if (currentTime == 0) {
      setcurrentLyrics(lyricsList[0]);
      setnextTimeStamp(timeStampList[1]);
    }
  }, [currentTime]);

  useEffect(() => {
    if (project) {
      extractLyricsJSON();
      setisAPILoading(false);
      let tempAudio = new Audio(project.song);
      setAudio(tempAudio);

      const updateCurrentTime = () => {
        setCurrentTime(tempAudio.currentTime);
      };

      const updateDuration = () => {
        setduration(tempAudio.duration);
      };

      const handleEnded = () => {
        setIsEnded(true);
      };

      // attach event listener
      tempAudio.addEventListener("timeupdate", updateCurrentTime);
      tempAudio.addEventListener("loadedmetadata", updateDuration);
      tempAudio.addEventListener("ended", handleEnded);

      // Cleanup event listener and pause audio when component unmounts or URL changes
      return () => {
        tempAudio.removeEventListener("timeupdate", updateCurrentTime);
        tempAudio.removeEventListener("loadedmetadata", updateCurrentTime);

        tempAudio.pause();
        setCurrentTime(0); // Reset the time
      };
    }
  }, [project]);

  function handleTimeUpdate() {
    console.log("onreset", currentTime, nextTimeStamp);
    if (currentTime > nextTimeStamp && currentTime != 0) {
      console.log(
        "time:",
        currentTime,
        nextTimeStamp,
        currentTime > nextTimeStamp
      );
      const idx = timeStampList.indexOf(nextTimeStamp);
      if (idx + 1 < timeStampList.length) {
        setnextTimeStamp(timeStampList[idx + 1]);
      }
      setcurrentLyrics(lyricsList[idx]);
    }
    // update progress bar
    const width = currentTime / duration;

    console.log("width: ", currentTime, duration, currentTime / duration);
    if (duration != 0) {
      setwidthProgressBar(width * 90);
    }
  }

  function handleReset(startPlaying: boolean) {
    console.log("inside reset");
    // reset lyrics sync
    console.log("reset lyrics", timeStampList[1], lyricsList[0]);
    setnextTimeStamp(timeStampList[1]);
    setcurrentLyrics(lyricsList[0]);
    setIsEnded(false);
    if (audio) {
      if (startPlaying) {
        const playState = 2;
        setisPlaying(true);
        audio.currentTime = 0;
        audio.play();
        sendMessage("Michelle@Idle", "ControlPlayState", playState);
      } else {
        const playState = 3;
        setisPlaying(false);
        audio.currentTime = 0;
        audio.pause();
        sendMessage("Michelle@Idle", "ControlPlayState", playState);
      }
    }
  }

  function extractLyricsJSON() {
   try {
    const firstIndex = project.choreography.indexOf("{");
    const lastIndex = project.choreography.lastIndexOf("}");
    const jsonString = project.choreography.substring(
      firstIndex,
      lastIndex + 1
    );
    if (jsonString) {
      const lyricsJSON = JSON.parse(
        project.choreography.substring(firstIndex, lastIndex + 1)
      );
      const timeStamp: Float32List = Object.keys(lyricsJSON).map((e) =>
        parseFloat(e)
      );

      // populate lyrics list
      const lyrics: string[] = Object.keys(lyricsJSON).map(
        (e) => lyricsJSON[e].lyrics
      );
      const stepsList: Float32List = Object.keys(lyricsJSON).map(
        (e) => lyricsJSON[e].steps
      );
      const newTimeStamp = spreadLyrics(lyrics, duration);
      settimeStampList(newTimeStamp);
      setLyricsList(lyrics);
      setnextTimeStamp(timeStamp[1]);
      setcurrentLyrics(lyrics[0]);
      setstepSequence(stepsList.join("_"));
      
    }
   } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Unable to fetch and parse lyrics or steps.",
      confirmButtonColor: "#18191A",
      confirmButtonText: "okay",
    });
   }

  
  }
  function spreadLyrics(lyrics: string[], total_time: number): number[] {
    const timestamps: number[] = [];
    const totalLength = lyrics.reduce((sum, lyric) => sum + lyric.length, 0);

    let currentTime = 0;
    for (let i = 0; i < lyrics.length; i++) {
      timestamps.push(currentTime);
      currentTime += (lyrics[i].length / totalLength) * total_time;
    }

    return timestamps;
  }

  async function fetchProject() {
    try {
      const res = await axios.get(`${endpoint}/fetchproject/${projectId}`);
      setProject(res.data["project"]);
      if (res.data["project"]["visibility"] == "private") {
        const valid = res.data["project"]["owner"] == uid;
        if (!valid) {
          Swal.fire({
            title: "Error!",
            text: "You don't have access to this page!",
            confirmButtonColor: "#18191A",
            confirmButtonText: "okay",
          });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  }

  function handlePlayPause() {
    let playState;
    if (!isReset) {
      playState = 2;
      setisReset(!isReset);
      setisPlaying(true);
      audio?.play();
    } else {
      playState = isPlaying ? 0 : 1;
      setisPlaying(!isPlaying);
      if (playState) {
        audio?.play();
      } else {
        audio?.pause();
      }
    }
    sendMessage("Michelle@Idle", "ControlPlayState", playState);
  }

  function sendStepSequence() {
    sendMessage("Michelle@Idle", "SetStepSequence", stepSequence);
  }

  return (
    <>
      <Nav></Nav>
      {isAPILoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="" />
          <p>Fetching your Nataraj Choreographed Project</p>
        </div>
      ) : (
        <div>
          <p className={Styles.subtitle}>Project: {project?.projectName}</p>
          <div className={Styles.container}>
            <Unity
              unityProvider={unityProvider}
              style={{
                width: "80vw",
                height: "60vh",
              }}
            />
          </div>
          <br />
          <div className={Styles.bottomContainer}>
            <div className={Styles.ProgressBarContainer}>
              <div className={Styles.ProgressBar}></div>
              <div
                className={Styles.ProgressBarInner}
                style={{ width: `${widthProgressBar}%` }}
              ></div>
              <br />
              <div className={Styles.buttonsContainer}>
                {isPlaying ? (
                  <button
                    className={Styles.playPauseBtn}
                    disabled={!isUnityLoaded}
                  >
                    <img
                      className="pauseBtn"
                      onClick={handlePlayPause}
                      src={pauseIcon}
                      alt=""
                    />{" "}
                    :
                  </button>
                ) : (
                  <button
                    className={Styles.playPauseBtn}
                    disabled={!isUnityLoaded}
                  >
                    <img
                      className="playBtn"
                      onClick={handlePlayPause}
                      src={playIcon}
                      alt=""
                    />{" "}
                    :
                  </button>
                )}
                <button
                  disabled={!isUnityLoaded}
                  className={Styles.playPauseBtn}
                >
                  <img
                    src={resetIcon}
                    onClick={() => handleReset(true)}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className={Styles.lyricbox}>
              <img src={quote} className={Styles.quote} alt="" />
              <p className={Styles.currentlyrics}>{currentLyrics}</p>
            </div>
          </div>

          <div className={Styles.playStoreContainer}>
            <center>
              <p>Practice it on Android App</p>
            </center>
            <img
              title="google play"
              src={googleplay}
              onClick={() =>
                (window.location.href =
                  "https://play.google.com/store/apps/details?id=co.zanie.nataraj")
              }
              className={Styles.googleplayimg}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
