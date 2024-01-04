import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeHeader from './components/HomeHeader';
import Homebody from "./components/HomeBody";
import Homebody2 from "./components/HomeBody2";

import About from './components/About';
import Simulation from './components/Simulation';
import Signup from './components/Signup';
import KakaoMapLanding from './components/KakaoMapLanding';
import Login from './components/Login';
import Product from './components/Product';
import Cart from './components/Cart';


function App() {
  return (
    <BrowserRouter>
      <HomeHeader />
      <main style={{marginTop: "56px"}}>
      <Routes>
      <Route path='/' element={<Homebody2 />} />
        {/* <Route path='/' element={<Homebody />} /> */}
        <Route path='/about' element={<About />} />
        <Route path='/dental' element={<KakaoMapLanding/>} />
        <Route path='/simulation' element={<Simulation />} />
        <Route path='/product' element={<Product />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />


      </Routes>

      </main>
      <div className="App">
        {/* <CustomHook /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
