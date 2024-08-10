import { useNavigate } from "react-router-dom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectAudio.module.css";
import "./SelectAudio.module.css";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "react-mirt/dist/css/react-mirt.css";
import Mirt from "react-mirt";
import { auth } from "../../../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import loader from "../../../assets/loader.svg";
import {
  setProjectID,
  updateCheckpoint,
  updateProjectName,
} from "../../../store/store";
import { generateName } from "../../../utils/generate_name";
import edit from "../../../assets/edit.svg";
import tick from "../../../assets/tick.svg";
import thumbnail1 from "../../../assets/thumbnail1.jpg";
import thumbnail2 from "../../../assets/thumbnail2.jpg";
import thumbnail3 from "../../../assets/thumbnail3.jpg";
import thumbnail4 from "../../../assets/thumbnail4.jpg";
import thumbnail5 from "../../../assets/thumbnail5.jpg";
import Songtile from "../../../features/songtile/Songtile";
import Swal from "sweetalert2";

const SelectAudio = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioURL] = useState("");
  const [filename, setFilename] = useState("");
  const [blob, setBlob] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  const [editing, setEditing] = useState(false);
  const [back, setBack] = useState(true);
  const [selected, changeSelected] = useState(0);
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [randThumbnail, setRandThumbnail] = useState<string | undefined>(
    undefined
  );
  const localSongs = [
    {
      title: "Emdi - Hurts Like This (feat. Veronica Bravo) [NCS Release].mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/ncs%2FEmdi%20-%20Hurts%20Like%20This%20(feat.%20Veronica%20Bravo)%20%5BNCS%20Release%5D.mp3?alt=media&token=ca1d660b-bf17-48ed-b3b4-ab541373dbdd",
    },

    {
      title: "NIVIRO - Without You (feat. Justin J. Moore) [NCS Release].mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/ncs%2FNIVIRO%20-%20Without%20You%20(feat.%20Justin%20J.%20Moore)%20%5BNCS%20Release%5D.mp3?alt=media&token=3d206c4e-1c2c-4c7e-bbdc-09a8456ad101",
    },
    {
      title:
        "Palm Skies & DEAN - Will You Come (Feat. Reuben Cameron) [NCS Release].mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/ncs%2FPalm%20Skies%20%26%20DEAN%20-%20Will%20You%20Come%20(Feat.%20Reuben%20Cameron)%20%5BNCS%20Release%5D.mp3?alt=media&token=b5390e04-e102-4008-95fa-bdba3ccd4740",
    },
    {
      title: "Tobu - Back To You [NCS Release].mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/ncs%2FTobu%20-%20Back%20To%20You%20%5BNCS%20Release%5D.mp3?alt=media&token=6ddad5b8-b873-4148-acbd-0e515fe15dbc",
    },
    {
      title: "Zushi & Vanko - Underrated (Feat. Sunny Lukas) [NCS Release].mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/ncs%2FZushi%20%26%20Vanko%20-%20Underrated%20(Feat.%20Sunny%20Lukas)%20%5BNCS%20Release%5D.mp3?alt=media&token=6a304096-d9d9-4790-8d46-c7c29566ab30",
    },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/restricted");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const name = generateName();
    setProjectName(name);
    dispatch(updateProjectName(name));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (evt: any) => {
    setisLoading(true)
    console.log(evt);
    const file = evt.target.files[0];
    setAudioFile(file);
    console.log(file)
    setAudioURL(URL.createObjectURL(file));
    console.log("url is ", audioUrl);
    setFilename(file.name);
    const thumbnail = [
      thumbnail1,
      thumbnail2,
      thumbnail3,
      thumbnail4,
      thumbnail5,
    ][Math.floor(Math.random() * 5)];
    setRandThumbnail(thumbnail);
    const lastPart = audioUrl.substring(audioUrl.lastIndexOf("/") + 1);
    setBlob(lastPart);
    setisLoading(false)
  };

  const handleSubmit = async () => {
    if(end-start>60000 || audioFile==null){
      Swal.fire({
        title: "Duration Exceeding",
        text: "Please trim a part under 1 minute and then try again!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
    else{
      try {
        // send audiofile and request to python which would then..
        const data = {
          // file: audioFile,
          "start": start,
          "end": end,
          "uid": auth.currentUser?.uid,
          "title": audioFile?.name,
          "projectName": projectName
        };

        const formdata = new FormData()
        formdata.append("file", audioFile as Blob)
        formdata.append("start", start.toString());
        formdata.append("end", end.toString());
        formdata.append("uid", auth.currentUser?auth.currentUser.uid.toString():"");
        formdata.append("title", audioFile.name);
        formdata.append("projectName", projectName);



        const response = await axios.post(`${endpoint}/createproject`, formdata);
  
        // trim file, upload file to storage
        // create Project and set level on realtime db
        // link project to user on firestore db
  
        // set project state in redux
        dispatch(updateCheckpoint(1));
        dispatch(setProjectID(response.data["projectID"]));
  
        navigate("/selectdanceform");
      } catch (err:any) {
        Swal.fire({
          title: "Error!",
          text: err.toString(),
          confirmButtonColor: "#18191A",
          confirmButtonText: "okay",
        });
      }
    }
    
  };

  const setFilefromNCS = async (file:any) => {
    try {
      const response = await fetch(file.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const fileObject = new File([blob], file.title, { type: blob.type });
      console.log(fileObject);
      
      setAudioFile(fileObject);
      setAudioURL(URL.createObjectURL(fileObject));
      console.log("url is ", URL.createObjectURL(fileObject));
      
      setFilename(file.title);
      const thumbnails = [
        thumbnail1,
        thumbnail2,
        thumbnail3,
        thumbnail4,
        thumbnail5
      ];
      const thumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
      setRandThumbnail(thumbnail);
    } catch (error: any) {
      console.error(error);
      alert(error.toString());
    }
  };

  const set30 = () =>{
    
    setEnd(start+30000)
    changeSelected(0)
  }

  const set60 = () =>{
    
    setEnd(start+60000)
    changeSelected(1)
  }

  const setCustom = () =>{
    
    changeSelected(2)
  }
  return (
    <>
      {back == true ? (
        <div>
          <Nav />
          {
            isLoading?<div className={Styles.loading}>
            <img src={loader} className={Styles.loader} alt="" />
            <p>setting audio...</p>
          </div> :
            <div className={Styles.mainbody}>
            <p className={Styles.title}>DASHBOARD</p>
            {editing ? (
              <div className={Styles.projectName}>
                <input
                  type="text"
                  value={projectName}
                  className={Styles.editinput}
                  onChange={(evt) => {
                    setProjectName(evt.target.value);
                    dispatch(updateProjectName(evt.target.value));
                  }}
                />
                <img
                  src={tick}
                  alt=""
                  className={Styles.edit}
                  onClick={() => setEditing(false)}
                />
              </div>
            ) : (
              <div className={Styles.projectName}>
                <p className={Styles.subtitle}>Project: {projectName}</p>
                <img
                  src={edit}
                  alt=""
                  className={Styles.edit}
                  onClick={() => setEditing(true)}
                />
              </div>
            )}
            <br />
            <p className={Styles.step}>STEP 1: CHOOSE THE MUSIC</p>
            <div className={Styles.buttons}>
              <ButtonCustom
                title="UPLOAD FROM FILES"
                width="25"
                height="4"
                onClick={handleClick}
              />
              <input
                ref={inputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
            <br />
            <p className={Styles.subheading}>
              DON'T HAVE ANY MUSIC IN MIND? CHOOSE FROM OUR LIBRARY
            </p>
            <div className={Styles.libraryparent}>
              <div className={Styles.library}>
                {
                 localSongs.map((item, index) => {
                  return <Songtile data={item} index={index} onClick={()=>{setFilefromNCS(item)}}/>
                })
                }
              </div>
              <div className={Styles.selectedaudio}>
                <img src={randThumbnail} className={Styles.thumbnail} alt="" />
                <b>
                  <center><p>{filename}</p></center>
                </b>
              </div>
            </div>
            <br />
            <br />
            <GradientButton
              title="NEXT"
              width="25"
              height="3"
              onClick={() => {if(filename==""){
                Swal.fire({
                  title: "No file detected",
                  text: "Please select a music file and then try again!",
                  confirmButtonColor: "#18191A",
                  confirmButtonText: "okay",
                });
              }
            else{
              setBack(false)
            }
            }}
            />
          </div>
          }
        </div>
      ) : (
        <div className={Styles.trimaudio}>
          <Nav />
          <div className={Styles.mainbody}>
            <p className={Styles.title}>DASHBOARD</p>
            <p className={Styles.subtitle}>Project: {projectName}</p>
            <br />
            <p className={Styles.step}>STEP 2: KEEP THE PART YOU WANT</p>

            <br />
            <br />
            <Mirt
              file={audioFile}
              start={start}
              end={end}
              onChange={(e)=>{setStart(e.start); setEnd(e.end); if((end-start)%30!=0){setCustom()}}}
              className={Styles.mirtdiv}
              options={{
                waveformColor: "#FFBA09",
                showButton: true,
                fineTuningScale: 1,
              }}
            />
          <h4>Total Length: {(end-start)/1000} seconds</h4>
            <div className={Styles.timeoptions}>
              <div onClick={()=>{set30()}}
                className={selected == 0 ? Styles.selected : Styles.unselected}
              >
                <p>30 seconds</p>
              </div>
              <div onClick={()=>{set60()}}
                className={selected == 1 ? Styles.selected : Styles.unselected}
              >
                <p>1 minute</p>
              </div>
              <div onClick={()=>{setCustom()}}
                className={selected == 2 ? Styles.selected : Styles.unselected}
              >
                <p>custom</p>
              </div>
            </div>
            <div className={Styles.navbuttons}>
              <ButtonCustom
                title="BACK"
                color="red"
                width="25"
                height="3"
                onClick={() => setBack(true)}
              />
              <GradientButton
                title="NEXT"
                width="25"
                height="3"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectAudio;
