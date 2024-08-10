import { useEffect, useRef, useState } from "react";
import Styles from "./AudioRND.module.css";
import ReactAudioPlayer from "react-audio-player";
import Mirt from "react-mirt";
import "react-mirt/dist/css/react-mirt.css";

const AudioRND = () => {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const fileInputRef = useRef(null);
  const [trimmedUrl, setTrimmedURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioURL(URL.createObjectURL(file));
  };

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleTrim = async () => {};

  return (
    <>
      <div className={Styles.mainbody}>
        <h1>Temporary code for sorting audio trim</h1>
        <div className={Styles.upload}>
          <button onClick={handleUploadClick} className={Styles.button}>
            Upload Music
          </button>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {audioURL && (
          <div>
            <ReactAudioPlayer
              src={audioURL}
              controls
              className={Styles.player}
              //   onPlay={initializeWaveSurfer}
            />
            <div className={Styles.trimmer}>
              <input
                type="number"
                placeholder="start seconds"
                className={Styles.triminput}
                onChange={(evt) => setStart(evt.target.value)}
              />
              <input
                type="number"
                placeholder="end seconds"
                className={Styles.triminput}
                onChange={(evt) => setEnd(evt.target.value)}
              />

              <button onClick={handleTrim} className={Styles.button}>
                Trim
              </button>
            </div>
          </div>
        )}

        <Mirt
          file={audioFile}
          style={{ width: "30rem" }}
          end={end * 1000}
          start={start * 1000}
        />

        {trimmedUrl && (
          <div>
            <h1>got audio</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioRND;
