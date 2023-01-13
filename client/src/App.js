import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profil from './pages/Profil';

const App = () => {
  const [uid, setUid] = useState();
  return (
    <AppContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;