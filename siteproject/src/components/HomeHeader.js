import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import "../styles/header.css"
import "../styles/headerprac.css"

import About from "./About"


export default function HomeHeader() {

  const [menulist, setMenuList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = (isLoggedIn) => {
    // 로그인 로직 처리 후 로그인 상태 업데이트
    setIsLoggedIn(isLoggedIn);
  };

  const handleLogout = () => {
    // 로그아웃 로직 처리 후 로그인 상태 업데이트
    setIsLoggedIn(false);
  };

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
            <Link to="/product"><li onClick={toggleMenu}>Product</li></Link>
           
            {isLoggedIn ? (
            <>
            <Link to="/">
              <li onClick={handleLogout} style={{ fontSize: "16px", marginTop: "5px" }}>
                로그아웃
              </li>
            </Link>
            {/* 로그인 헤더의 나머지 내용 */}
            </>
          ) : (
            <>
          <Link to="/signup">
            <li onClick={toggleMenu} style={{ fontSize: "16px", marginTop: "5px" }}>
              회원가입
            </li>
          </Link>
          <Link to="/login">
            <li onClick={handleLogin} style={{ fontSize: "16px", marginTop: "5px" }}>
              로그인
            </li>
          </Link>
        </>
      )}

            <Link to="/cart"><li onClick={toggleMenu} style={{fontSize:"16px", marginTop:"5px"}}>장바구니</li></Link>

            </ul>
        </nav>
      </header>
    </>
  );
}
