import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeHeader from './components/HomeHeader';
import Homebody from "./components/HomeBody";
// import CustomHook from './components/CustomHooks';
import About from './components/About';
import Dental from './components/Dental';
import Simulation from './components/Simulation';
// import DentalPrac from './components/DentalPrac';
import Signup from './components/Signup';
// import KakaoMap from './components/KakaoMap';
// import KakaoMapPrac from './components/KakaoMapPrac';
// import KakaoMapPrac2 from './components/KakaoMapPrac2';
// import KakaoMapPrac3 from './components/KakaoMapPrac3';
// import KakaoMapPrac4 from './components/KakaoMapPrac4';
import KakaoMapLanding from './components/KakaoMapLanding';
import Login from './components/Login';


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
        {/* <Route path='/dental' element={<DentalPrac />} /> */}
        {/* <Route path='/dental' element={<KakaoMap />} /> */}
        {/* <Route path='/dental' element={<KakaoMapPrac />} /> */}
        {/* <Route path='/dental' element={<KakaoMapPrac2 />} /> */}
        {/* <Route path='/dental' element={<KakaoMapPrac3 />} /> */}
        {/* <Route path='/dental' element={<KakaoMapPrac4 />} /> */}
        <Route path='/dental' element={<KakaoMapLanding/>} />


        <Route path='/simulation' element={<Simulation />} />

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      </Routes>

      </main>
      <div className="App">
        {/* <CustomHook /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
