import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth } from 'firebase/auth';
import { getAuth } from "firebase/auth";
// import * as dotenv from 'dotenv';
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

// dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// export default ;
// export default storage;