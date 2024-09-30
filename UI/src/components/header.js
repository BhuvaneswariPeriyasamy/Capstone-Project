import React from 'react';
import logo from '../images/Urban_Furniture_Logo.jpg';

const Header = ({ isLoggedIn, handleLogin }) => {
  return (
    <header className="header">

<div className="logo">
        <img src={logo} alt="Furniture Store Logo" />
        <div className="name">Urban Furniture</div>
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
        
        </ul>
      </nav>
  
    </header>
  );
};

export default Header;
