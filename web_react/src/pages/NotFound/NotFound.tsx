import { useNavigate } from "react-router-dom";
import GradientButton from "../../features/gradientbutton/GradientButton";
import Styles from "./NotFound.module.css"
import four04 from "../../assets/four04.svg"

const NotFound = () =>{
    const navigate = useNavigate()
    return (
        <>
            <div className={Styles.notfound}>
                <img src={four04} alt="" className={Styles.four04}/>
                <h1 className={Styles.title}>Nothing Here</h1>
                <p className={Styles.subtitle}>How did you stumble upon here lol?</p>
                <GradientButton title="GO BACK HOME" width="40" height="5" onClick={()=>navigate('/')}/>
            </div>
        </>
    )
}


export default NotFound;