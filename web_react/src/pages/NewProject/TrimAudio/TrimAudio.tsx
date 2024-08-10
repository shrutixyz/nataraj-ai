import { useNavigate } from "react-router-dom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./TrimAudio.module.css"
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import SocialButton from "../../../features/socialbutton/SocialButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';

const TrimAudio = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const [audioUrl, setAudioURL] = useState("")

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/restricted')
    }
  }, [isLoggedIn])

  useEffect(()=>{
    const url = window.location.href;
    const blobCode = url.split('blob=')[1];
    const newUrl = `http://localhost:3000/${blobCode}`;
    setAudioURL(newUrl);
  }, [])


    return (
      <>
        <h1>NOTE: using selectaudio instead</h1>
      </>
    )
}

export default TrimAudio;

