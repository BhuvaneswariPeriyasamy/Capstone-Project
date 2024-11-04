import React from 'react';
import logo from '../images/Urban_Furniture_Logo.jpg';
import axios from 'axios';

const Header = ({ user, setUser }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Furniture Store Logo" />
        <div className="name">Urban Furniture</div>
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          {user ? (
            <>
              <li>Hello, {user.firstname}</li>
              <li><a href="/">Home</a></li>
              <li><a href="#" onClick={() => {
                axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true })
                  .then(() => setUser(null)) // Reset user on logout
                  .catch(err => console.log(err));
              }}>Logout</a></li>
            </>
          ) : (
            <>
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
