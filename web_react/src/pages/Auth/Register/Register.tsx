import { useEffect } from "react";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Register.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () =>{
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    // const dispatch = useDispatch();
  
    useEffect(()=>{
      if(isLoggedIn){
        navigate('/dashboard')
      }
    }, [])
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
            <h1 className={Styles.title}>SIGN UP</h1>
            <a href="/login" className={Styles.subtitleref}>ALREADY A USER? LOGIN</a>
            <p className={Styles.options}>SIGNUP OPTIONS</p>
            <div className={Styles.sociallogins}>
                <SocialButton title="Signup with Google" width="25" height="4" service="google"/>
                <SocialButton title="Signup with Google" width="25" height="4" service="github"/>
            </div>
            <p className={Styles.options}>EMAIL SIGNUP</p>
            <input type="email" placeholder="EMAIL ADDRESS" />
            <br />
            <input type="password" placeholder="PASSWORD" />
            <br />
            <input type="password" placeholder="CONFIRM PASSWORD" />
            <br /><br /><br />
            <GradientButton title="SIGNUP" height="4" width="25"/>
        </div>
        <Footer/>
        </>
    )
}

export default Register;