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
import { setProjectID, updateCheckpoint } from "../../../store/store";

const SelectAudio = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioURL] = useState("");
  const [filename, setFilename] = useState("");
  const [blob, setBlob] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [back, setBack] = useState(true);
  const [selected, changeSelected] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/ca");
    }
  }, [isLoggedIn]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = (evt: any) => {
    console.log(evt);
    const file = evt.target.files[0];
    setAudioFile(file);
    setAudioURL(URL.createObjectURL(file));
    console.log("url is ", audioUrl);
    setFilename(file.name);
    const lastPart = audioUrl.substring(audioUrl.lastIndexOf("/") + 1);
    setBlob(lastPart);
  };

  const handleSubmit = async () => {
    try {
      // send audiofile and request to python which would then..
      const data = {
        file: audioFile,
        start: start,
        end: end,
        uid: auth.currentUser?.uid,
        title: audioFile?.name,
      };
      const response = await axios.post(`${endpoint}/createproject`, data);

      // trim file, upload file to storage
      // create Project and set level on realtime db
      // link project to user on firestore db

      // set project state in redux
      dispatch(updateCheckpoint(1));
      dispatch(setProjectID(response.data["projectID"]));

      navigate("/selectdanceform");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {back == true ? (
        <div>
          <Nav />
          <div className={Styles.mainbody}>
            <p className={Styles.title}>DASHBOARD</p>
            <p className={Styles.subtitle}>Untitled Project</p>
            <br />
            <p className={Styles.step}>STEP 1: CHOOSE THE MUSIC</p>
            <div className={Styles.buttons}>
              {/* <ButtonCustom title="SELECT FROM SPOTIFY" width="25" height="4" />
            <p>OR</p> */}
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
            <br />
            <br />
            <br />
            <p className={Styles.subheading}>
              DON'T HAVE ANY MUSIC IN MIND? CHOOSE FROM OUR LIBRARY
            </p>
            <div className={Styles.libraryparent}>
              <div className={Styles.library}></div>
              <div className={Styles.selectedaudio}>
                <p>{filename}</p>
              </div>
            </div>
            <br />
            <br />
            <GradientButton
              title="NEXT"
              width="25"
              height="3"
              onClick={() => setBack(false)}
            />
          </div>
        </div>
      ) : (
        <div>
          <Nav />
          <div className={Styles.mainbody}>
            <p className={Styles.title}>DASHBOARD</p>
            <p className={Styles.subtitle}>Untitled Project</p>
            <br />
            <p className={Styles.step}>STEP 2: KEEP THE PART YOU WANT</p>

            <br />
            <br />
            <Mirt
              file={audioFile}
              style={{ width: "30rem" }}
              end={end * 1000}
              start={start * 1000}
              className={Styles.mirtdiv}
              options={{ waveformColor: "#FFBA09", showButton: true }}
            />
            <div className={Styles.timeoptions}>
              <div
                className={selected == 0 ? Styles.selected : Styles.unselected}
              >
                <p>30 seconds</p>
              </div>
              <div
                className={selected == 0 ? Styles.selected : Styles.unselected}
              >
                <p>1 minute</p>
              </div>
              <div
                className={selected == 0 ? Styles.selected : Styles.unselected}
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
