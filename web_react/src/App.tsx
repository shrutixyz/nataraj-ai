import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import { Counter } from './features/counter/Counter';
import './global.css';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Tutorials from './pages/Tutorials/Tutorials';
import ConditionalAccess from './pages/ConditionalAccess/ConditionalAccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/tutorials" element={<Tutorials/>} />
        <Route path="/ca" element={<ConditionalAccess/>} />
        {/* <Route path="/counter" element={<Counter/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
