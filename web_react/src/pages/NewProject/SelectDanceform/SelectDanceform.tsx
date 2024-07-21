import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectDanceform.module.css"

const SelectDanceform = () => {
    const navigate = useNavigate()
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p> 
          <p className={Styles.subtitle}>Untitled Project</p>
          <br />
          <p className={Styles.step}>STEP 3: SELECT THE DANCE STYLE</p>
          <p>NOTE: YOU CAN SELECT MULTIPLE IF YOU WANT A FUN FUSION!</p>

          
          <br /><br />
          <div className={Styles.navbuttons}>
          <ButtonCustom title="BACK" color="red" width="25" height="3" onClick={()=>navigate('/trimaudio')} />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>navigate('/customiseavatar')} />
          </div>
        </div>
        </>
    )
}

export default SelectDanceform;