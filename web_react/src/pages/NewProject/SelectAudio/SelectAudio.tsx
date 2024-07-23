import { useNavigate } from "react-router-dom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectAudio.module.css"
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import {updateMusicUrl} from "../../../store/store"

const SelectAudio = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const publicUrl = useSelector((state: any) => state.auth.musicUrl);

  // const dispatch = useDispatch();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/ca')
    }
  }, [])

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('audio/mpeg')) {
      setSelectedFile(null);
      // dispatch(uploadError({ message: 'Invalid file type (must be MP3)' }));
      return;
    }
    setSelectedFile(file);
    await handleUpload(file);
  };

  const handleUpload = async (selectedFile: any) => {
    // if (!selectedFile) {
    //   // dispatch(uploadError({ message: 'Please select a file to upload' }));
    //   console.log("error")
    //   return;
    // }


    try {
      const storageRef = ref(storage, `uploads/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      // dispatch(uploadSuccess({ url: downloadURL }));
      console.log("url issss ", downloadURL)
      dispatch(updateMusicUrl(downloadURL))
      setSelectedFile(null); // Clear state after successful upload
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };


    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p> 
          <p className={Styles.subtitle}>Untitled Project</p>
          <br />
          <p className={Styles.step}>STEP 1: CHOOSE THE MUSIC</p>
          <div className={Styles.buttons}>
            <ButtonCustom title="SELECT FROM SPOTIFY" width="25" height="4" />
            <p>OR</p>
            <ButtonCustom title="UPLOAD FROM FILES" width="25" height="4" />
            <input type="file" accept="audio/mpeg" onChange={handleFileChange} />

          </div>
          <br /><br />
          <br /><br />
          <p className={Styles.subheading}>DON'T HAVE ANY MUSIC IN MIND? CHOOSE FROM OUR LIBRARY</p>
          <div className={Styles.libraryparent}>
            <div className={Styles.library}>

            </div>
            <div className={Styles.selectedaudio}>

            </div>
          </div>
          <br /><br />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>navigate('/trimaudio')} />
        </div>
        </>
    )
}

export default SelectAudio;