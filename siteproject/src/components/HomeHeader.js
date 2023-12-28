import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import "../styles/header.css"
import "../styles/headerprac.css"
import CustomHook from './CustomHooks';
import About from "./About"
export default function HomeHeader() {

  const [menulist, setMenuList] = useState(false);


  // 리액트 컴포넌트에서 외부 스크립트를 사용하려면 useEffect 사용해서 추가해야됨
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://kit.fontawesome.com/aa8580d66e.js';
    script1.crossOrigin = 'anonymous';
    document.body.appendChild(script1);


    return () => {
      // 컴포넌트가 언마운트될 때 스크립트 제거
      document.body.removeChild(script1);
    };
  }, []);

const toggleMenu = ()=>{
  setMenuList(!menulist);
}

  return (
    <>
    
      <header >
        <nav className="navbar">
          <div className="navbar__logo" onClick={toggleMenu}>
            <i className="fa-solid fa-bars" ></i>
          </div>


            <ul className={`navbar__menu ${menulist ? 'visible' : ''}`}>

            {/* <ul className='navbar__menu'>{menulist} */}
            <Link to="/"><li onClick={toggleMenu}>Home</li></Link>
            <Link to="/dental"><li onClick={toggleMenu}>Dental</li></Link>
            <Link to="/simulation"><button id="btn-header1" onClick={toggleMenu}>Simulation</button></Link>
            <Link to="/price"><li onClick={toggleMenu}>Pricing</li></Link>
            <li>Sign in</li>


            </ul>
            {/* <div>Home</div> */}
            {/* <Link to="/about">About</Link> */}
            {/* <div>Dental</div> */}
            {/* <Link to="/dental">Dental</Link>
            <Link to="/simulation">
            <button id="btn-header1">Simulation</button>
            </Link> */}
            {/* <div>Pricing</div> */}
            {/* <Link to="/price">Pricing</Link> */}
            {/* <div>Sign in</div> */}
          {/* </div> */}
        </nav>
      </header>
    </>
  );
}
