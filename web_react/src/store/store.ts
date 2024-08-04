// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import {auth} from '../utils/firebase';

// Create a slice of the state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    signupName: "",
    signupEmail: "",
    signupPassword: "",
    musicUrl: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    updateSignupName: (state, name) =>{
      state.signupName = name.payload
    },
    updateSignupPassword: (state, password) =>{
      state.signupPassword = password.payload
    },
    updateSignupEmail: (state, email) =>{
      state.signupEmail = email.payload
    },
    updateMusicUrl: (state, url) =>{
      state.musicUrl = url.payload
    }
  },
});

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login()); 
  }
  else{
    store.dispatch(logout());
  }
});

const backendSlice = createSlice({
  name: 'backend',
  initialState: {
    // https://singular-node-429217-j4.uc.r.appspot.com/    deployed endpoint
    endpoint: "http://127.0.0.1:5000",
  },
  reducers: {
  },
});


const projectSlice = createSlice({
  name: 'project',
  initialState: {
    checkpoint: 0,
    projectID: 0,
    projectName: "",
  },
  reducers: {
    updateCheckpoint: (state, checkpoint) => {
      state.checkpoint = checkpoint.payload
    },
    setProjectID: (state, id) => {
      state.projectID = id.payload
    },
    updateProjectName: (state, name) =>{
      state.projectName = name.payload
    }
  },
});

// Export actions
export const { login, logout, updateSignupName, updateSignupEmail, updateSignupPassword, updateMusicUrl } = authSlice.actions;
export const { } = authSlice.actions;
export const { updateCheckpoint, setProjectID, updateProjectName } = projectSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    backend: backendSlice.reducer,
    project: projectSlice.reducer
  },
});

export default store;