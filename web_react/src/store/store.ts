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
    endpoint: "http://127.0.0.1:5000",
  },
  reducers: {
  },
});

// Export actions
export const { login, logout, updateSignupName, updateSignupEmail, updateSignupPassword, updateMusicUrl } = authSlice.actions;
export const { } = authSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    backend: backendSlice.reducer
  },
});

export default store;