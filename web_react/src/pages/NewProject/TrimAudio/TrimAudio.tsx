import { useNavigate } from "react-router-dom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./TrimAudio.module.css"
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import SocialButton from "../../../features/socialbutton/SocialButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TrimAudio = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  // const dispatch = useDispatch();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/ca')
    }
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
          <div className={Styles.navbuttons}>
          <ButtonCustom title="BACK" color="red" width="25" height="3" onClick={()=>navigate('/selectaudio')} />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>navigate('/selectdanceform')} />
          </div>
        </div>
        </>
    )
}

export default TrimAudio;