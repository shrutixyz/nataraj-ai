import {auth} from "../utils/firebase"
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/store";
import axios from "axios";



export const handleGoogleSignIn = async (endpoint) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, 
        provider);
      console.log('User signed in:', result.user);
      try{
        const res = axios.get(`${endpoint}/createuserdata/${result.user.uid}`, {timeout: 10000});
      }
      catch(err){
        console.log("error while pushing data")
      }
      return result.user;
    } catch (error) {
      console.error('Error during sign in:', error);
    }
    return null;
  };

export  const handleGithubSignIn = async (endpoint) => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with GitHub:', result.user);
      try{
        const res = axios.get(`${endpoint}/createuserdata/${result.user.uid}`, {timeout: 10000});
      }
      catch(err){
        console.log("error while pushing data")
      }
      return result.user;
    } catch (error) {
      console.error('Error during sign in:', error);
    }
    return null
  };


export  const handleEmailSignUp = async (email, password, endpoint) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed in with GitHub:', result.user);
      try{
        const res = axios.get(`${endpoint}/createuserdata/${result.user.uid}`, {timeout: 10000});
      }
      catch(err){
        console.log("error while pushing data")
      }
      
      return result.user;
    //   navigate('/dashboard')
    
    } catch (error) {
      console.error('Error during sign in:', error);
    }
    return null
  };


  export  const handleEmailSignIn = async (email, password, endpoint) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in with GitHub:', result.user);
      try{
        const res = axios.get(`${endpoint}/createuserdata/${result.user.uid}`, {timeout: 10000});
      }
      catch(err){
        console.log("error while pushing data")
      }
      
      return result.user;
    //   navigate('/dashboard')
    
    } catch (error) {
      console.error('Error during sign in:', error);
    }
    return null
  };


export const updateUserProfileDisplayName = async(user, name)=>{
    try{
        await updateProfile(user, { name });
    }
    catch(error){
        console.log("Error updating user profile: " + error)
    }
}


export const updateUserProfilePhotoURL = async(user, downloadUrl)=>{
    try{
        await updateProfile(user, { photoURL: downloadUrl });
    }
    catch(error){
        console.log("Error updating user profile: " + error)
    }
}

