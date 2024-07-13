import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/counter" element={<Counter/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
