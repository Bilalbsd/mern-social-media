import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profil from './pages/Profil';

const App = () => {  
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;