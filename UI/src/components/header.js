import React, { useState, useEffect }  from 'react';
import logo from '../images/Urban_Furniture_Logo.jpg';
import axios from 'axios';

const Header = ({ user, setUser }) => {
<<<<<<< HEAD
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    // Fetch the logo image from the backend API
    axios.get('http://localhost:5000/banner/logo', { responseType: 'blob' })
      .then(response => {
        // Convert blob to a URL and set it as logoUrl
        const url = URL.createObjectURL(response.data);
        setLogoUrl(url);
      })
      .catch(error => {
        console.error("Error fetching logo:", error);
      });
  }, []);
  return (
    <header className="header">
      <div className="logo">
      {logoUrl ? (
          <img src={logoUrl} alt="Furniture Store Logo" />
        ) : (
          <p>Loading logo...</p>
        )}
=======
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Furniture Store Logo" />
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
        <div className="name">Urban Furniture</div>
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          {user ? (
            <>
              <li>Hello, {user.firstname}</li>
              <li><a href="/">Home</a></li>
<<<<<<< HEAD
              <li><a href="/products">Products</a></li>
=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
              <li><a href="#" onClick={() => {
                axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true })
                  .then(() => setUser(null)) // Reset user on logout
                  .catch(err => console.log(err));
              }}>Logout</a></li>
            </>
          ) : (
<<<<<<< HEAD
            < >
            
              <li><a href="/" >Home</a></li>
              <li><a href="/products" >Products</a></li>
              <li><a href="/cart"  >Cart</a></li>
              <li><a href="/register" >Register</a></li>
              <li><a href="/login"  >Login</a></li>
=======
            <>
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
            </>
          )}
        </ul>
      </nav>
<<<<<<< HEAD


=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
    </header>




  );
};

export default Header;
