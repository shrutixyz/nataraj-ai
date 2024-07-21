import { useNavigate } from "react-router-dom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectAudio.module.css"
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SelectAudio = () => {
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
          <p className={Styles.step}>STEP 1: CHOOSE THE MUSIC</p>
          <div className={Styles.buttons}>
            <ButtonCustom title="SELECT FROM SPOTIFY" width="25" height="4" />
            <p>OR</p>
            <ButtonCustom title="UPLOAD FROM FILES" width="25" height="4" />
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