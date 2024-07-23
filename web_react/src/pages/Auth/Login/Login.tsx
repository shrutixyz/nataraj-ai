import { useNavigate } from "react-router-dom";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Login.module.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {handleEmailSignIn, handleGithubSignIn, handleGoogleSignIn} from "../../../utils/firebase_functions.js";
import { useDispatch } from "react-redux";
import { login } from "../../../store/store";


const Login = () =>{
  const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    const endpoint = useSelector((state: any) => state.backend.endpoint);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(()=>{
      console.log(isLoggedIn)
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

   const emailSignIn = async (email: String, password:String) =>{
      const res = await handleEmailSignIn(email, password, endpoint);
      if(res!==null){
        dispatch(login());
        navigate('/dashboard')
      }
      else{
        console.log("error")
      }
   }
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
            <h1 className={Styles.title}>LOGIN</h1>
            <a href="/signup" className={Styles.subtitleref}>TRYING FOR FIRST TIME? SIGNUP</a>
            <p className={Styles.options}>LOGIN OPTIONS</p>
            <div className={Styles.sociallogins}>
                <SocialButton title="Login with Google" width="25" height="4" service="google" onClick={googleSignin}/>
                <SocialButton title="Login with GitHub" width="25" height="4" service="github" onClick={githubSignin}/>
            </div>
            <p className={Styles.options}>EMAIL LOGIN</p>
            <input type="text" placeholder="EMAIL ADDRESS" onChange={(evt)=>setEmail(evt.target.value)} />
            <br />
            <input type="password" placeholder="PASSWORD" onChange={(evt)=>setPassword(evt.target.value)} />
            <br /><br /><br />
            <GradientButton title="SIGNUP" height="4" width="25" onClick={()=>emailSignIn(email, password)}/>
        </div>
        <Footer/>
        </>
    )
}

export default Login;