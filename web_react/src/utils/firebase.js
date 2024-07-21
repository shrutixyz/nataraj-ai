import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import * as dotenv from 'dotenv';

dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nataraj-ai.firebaseapp.com",
  databaseURL: "https://nataraj-ai-default-rtdb.firebaseio.com",
  projectId: "nataraj-ai",
  storageBucket: "nataraj-ai.appspot.com",
  messagingSenderId: "913245702638",
  appId: "1:913245702638:web:086ae7724d0ec7c92926ff",
  measurementId: "G-1FLKTKEVTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;