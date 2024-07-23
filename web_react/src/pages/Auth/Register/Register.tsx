import { useEffect, useState } from "react";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Register.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, updateSignupEmail, updateSignupPassword } from "../../../store/store";
import { handleGithubSignIn, handleGoogleSignIn } from "../../../utils/firebase_functions";

const Register = () =>{
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    const endpoint = useSelector((state:any) => state.backend.endpoint);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
  
    useEffect(()=>{
      if(isLoggedIn){
        navigate('/dashboard')
      }
    }, [])

    const googleSignin = async () =>{
      const res = await handleGoogleSignIn(endpoint);
      if(res!==null){
        dispatch(login());
        navigate('/dashboard')
      }
      else{
        console.log("error")
      }
     }
  
  
     const githubSignin = async () =>{
      const res = await handleGithubSignIn(endpoint);
      if(res!==null){
        dispatch(login());
        navigate('/dashboard')
      }
      else{
        console.log("error")
      }
     }
  
    //  const emailSignIn = async (email: String, password:String) =>{
    //     const res = await handleEmailSignIn(email, password, endpoint);
    //     if(res!==null){
    //       dispatch(login());
    //       navigate('/dashboard')
    //     }
    //     else{
    //       console.log("error")
    //     }
    //  }

    const proceedLogin = ()=>{
        if(confirmPass!=password){
          alert("Passwords don't match")
        }
        else{
          dispatch(updateSignupEmail(email))
          dispatch(updateSignupPassword(password))
          navigate('/onboarding')
        }
    }
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
            <h1 className={Styles.title}>SIGN UP</h1>
            <a href="/login" className={Styles.subtitleref}>ALREADY A USER? LOGIN</a>
            <p className={Styles.options}>SIGNUP OPTIONS</p>
            <div className={Styles.sociallogins}>
                <SocialButton title="Signup with Google" width="25" height="4" service="google" onClick={googleSignin}/>
                <SocialButton title="Signup with GitHub" width="25" height="4" service="github" onClick={githubSignin}/>
            </div>
            <p className={Styles.options}>EMAIL SIGNUP</p>
            <input type="email" placeholder="EMAIL ADDRESS" onChange={(evt)=>{setEmail(evt.target.value)}}/>
            <br />
            <input type="password" placeholder="PASSWORD" onChange={(evt)=>{setPassword(evt.target.value)}} />
            <br />
            <input type="password" placeholder="CONFIRM PASSWORD" onChange={(evt)=>{setconfirmPass(evt.target.value)}}/>
            <br /><br /><br />
            <GradientButton title="SIGNUP" height="4" width="25" onClick={()=>proceedLogin()}/>
        </div>
        <Footer/>
        </>
    )
}

export default Register;