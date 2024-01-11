import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import "../styles/header.css"
import "../styles/headerprac.css"
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../redux/actions/authAction";
import About from "./About"

const activeStyle = {
  fontWeight:'600',
  color:'black',
  backgroundColor : "rgb(250, 250, 112)",
  borderRadius:"550px",
  border:"solid 0",
  margin : "2px"
 }

export default function HomeHeader() {

  const [menulist, setMenuList] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginSuccess());
  };

  const handleLogout = () => {
    dispatch(logout());
    
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
            <NavLink to="/" style={({isActive})=> (isActive ? activeStyle : {})}><li onClick={toggleMenu}>Home</li></NavLink >
            <NavLink to="/dental" style={({isActive})=> (isActive ? activeStyle : {})}><li onClick={toggleMenu}>Dental</li></NavLink>
            <NavLink to="/simulation" style={({isActive})=> (isActive ? activeStyle : {})}><li onClick={toggleMenu}>Simulation</li></NavLink>
            <NavLink to="/product" style={({isActive})=> (isActive ? activeStyle : {})}><li onClick={toggleMenu}>Product</li></NavLink>
           
            {isLoggedIn ? (
            <>
            <NavLink to="/" >
              <li onClick={handleLogout} style={{ fontSize: "16px", marginTop: "3px" }}>
                로그아웃
              </li>
            </NavLink>
            </>
          ) : (
            <>
          <NavLink to="/signup" style={({isActive})=> (isActive ? activeStyle : {})}>
            <li onClick={toggleMenu} style={{ fontSize: "16px", marginTop: "3px" }}>
              회원가입
            </li>
          </NavLink>
          <NavLink to="/login" style={({isActive})=> (isActive ? activeStyle : {})}>
            <li onClick={toggleMenu} style={{ fontSize: "16px", marginTop: "3px" }}>
              로그인
            </li>
          </NavLink>
        </>
      )}
            </ul>
        </nav>
      </header>
    </>
  );
}
