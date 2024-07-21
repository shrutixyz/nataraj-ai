import { useNavigate } from "react-router-dom";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Login.module.css"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import auth from "../../../utils/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../store/store";


const Login = () =>{
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  
    useEffect(()=>{
      console.log(isLoggedIn)
      if(isLoggedIn){
        navigate('/dashboard')
      }
    }, [])

    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, 
          provider);
        console.log('User signed in:', result.user);
        dispatch(login());
        navigate('/dashboard')
      } catch (error) {
        console.error('Error during sign in:', error);
      }
    };

    const handleGithubSignIn = async () => {
      const provider = new GithubAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('User signed in with GitHub:', result.user);
        dispatch(login());
        navigate('/dashboard')
      } catch (error) {
        console.error('Error during sign in:', error);
      }
    };
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
            <h1 className={Styles.title}>LOGIN</h1>
            <a href="/signup" className={Styles.subtitleref}>TRYING FOR FIRST TIME? SIGNUP</a>
            <p className={Styles.options}>LOGIN OPTIONS</p>
            <div className={Styles.sociallogins}>
                <SocialButton title="Login with Google" width="25" height="4" service="google" onClick={handleGoogleSignIn}/>
                <SocialButton title="Login with GitHub" width="25" height="4" service="github" onClick={handleGithubSignIn}/>
            </div>
            <p className={Styles.options}>EMAIL LOGIN</p>
            <input type="text" placeholder="EMAIL ADDRESS" />
            <br />
            <input type="password" placeholder="PASSWORD" />
            <br /><br /><br />
            <GradientButton title="SIGNUP" height="4" width="25"/>
        </div>
        <Footer/>
        </>
    )
}

export default Login;