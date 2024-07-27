import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
// import { Counter } from './features/counter/Counter';
import './global.css';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Tutorials from './pages/Tutorials/Tutorials';
import ConditionalAccess from './pages/ConditionalAccess/ConditionalAccess';
import NotFound from './pages/NotFound/NotFound';
import Blogs from './pages/Blogs/Blogs';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Onboarding from './pages/Auth/Register/Onboarding';
import SelectAudio from './pages/NewProject/SelectAudio/SelectAudio';
// import TrimAudio from './pages/NewProject/TrimAudio/TrimAudio';
import SelectDanceform from './pages/NewProject/SelectDanceform/SelectDanceform';
import CustomiseAvatar from './pages/NewProject/CustomiseAvatar/CustomiseAvatar';
import Loading from './pages/NewProject/Loading/Loading';
import Project from './pages/Project/Project';
import Profile from './pages/Profile/Profile';
import AudioRND from './pages/RND/AudioRND';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/selectaudio" element={<SelectAudio/>} />
        {/* <Route path="/trimaudio" element={<TrimAudio/>} /> */}
        <Route path="/selectdanceform" element={<SelectDanceform/>} />
        <Route path="/customiseavatar" element={<CustomiseAvatar/>} />
        <Route path="/loading" element={<Loading/>} />
        <Route path="/project" element={<Project/>} />
        <Route path="/tutorials" element={<Tutorials/>} />
        <Route path="/ca" element={<ConditionalAccess/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rnd" element={<AudioRND />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/counter" element={<Counter/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
