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
  // const dispatch = useDispatch();
  const [audioUrl, setAudioURL] = useState("")

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/ca')
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
        <Nav/>
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p> 
          <p className={Styles.subtitle}>Untitled Project</p>
          <br />
          <p className={Styles.step}>STEP 2: KEEP THE PART YOU WANT</p>

          
          <br /><br />
          {/* <Mirt file={audioUrl} style={{"width": "30rem"}} end={end*1000} start={start*1000} /> */}
          <div className={Styles.navbuttons}>
          <ButtonCustom title="BACK" color="red" width="25" height="3" onClick={()=>navigate('/selectaudio')} />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>navigate('/selectdanceform')} />
          </div>
        </div>
        </>
    )
}

export default TrimAudio;