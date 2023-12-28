import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeHeader from './components/HomeHeader';
import Homebody from "./components/HomeBody";
// import CustomHook from './components/CustomHooks';
import About from './components/About';
import Dental from './components/Dental';
import Simulation from './components/Simulation';
import DentalPrac from './components/DentalPrac';

function App() {
  return (
    <BrowserRouter>
      <HomeHeader />
      <main style={{marginTop: "56px"}}>
      <Routes>
        <Route path='/' element={<Homebody />} />
        <Route path='/about' element={<About />} />

        {/* <Route path='/dental' element={<Dental />} /> */}
        {/* <Route path='/dental' element={<Dental />} /> */}
        <Route path='/dental' element={<DentalPrac />} />

        <Route path='/simulation' element={<Simulation />} />

      </Routes>
      </main>
      <div className="App">
        {/* <CustomHook /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
