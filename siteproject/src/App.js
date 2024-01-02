import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeHeader from './components/HomeHeader';
import Homebody from "./components/HomeBody";
// import CustomHook from './components/CustomHooks';
import About from './components/About';
import Dental from './components/Dental';
import Simulation from './components/Simulation';
import DentalPrac from './components/DentalPrac';
import Signup from './components/Signup';
// import KakaoMap from './components/KakaoMap';
// import KakaoMapPrac from './components/KakaoMapPrac';


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
        {/* <Route path='/dental' element={<KakaoMap />} /> */}
        {/* <Route path='/dental' element={<KakaoMapPrac />} /> */}


        <Route path='/simulation' element={<Simulation />} />

      <Route path='/signup' element={<Signup />} />
      </Routes>

      </main>
      <div className="App">
        {/* <CustomHook /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
