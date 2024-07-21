import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./CustomiseAvatar.module.css"

const CustomiseAvatar = () => {
    const navigate = useNavigate()
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p> 
          <p className={Styles.subtitle}>Untitled Project</p>
          <br />
          <p className={Styles.step}>STEP 4: CUSTOMIZE YOUR DANCING AVATAR</p>
          <br /><br />
          <div className={Styles.navbuttons}>
          <ButtonCustom title="BACK" color="red" width="25" height="3" onClick={()=>navigate('/selectdanceform')} />
          <ButtonCustom title="SAVE AVATAR IN PREFERENCES" color="green" width="25" height="3" onClick={()=>console.log("hello")} />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>navigate('/loading')} />
          </div>
        </div>
        </>
    )
}

export default CustomiseAvatar;