import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import {Routes, Route } from 'react-router-dom';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
<<<<<<< HEAD
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';

=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/session', { withCredentials: true });
        setUser(response.data); 
      } catch {
        setUser(null); 
      }
    };

    fetchUserSession();
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <main>
<<<<<<< HEAD
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/productdetails/product/:productId" element={<ProductDetails />} />
          </Routes>
=======
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
      </main>
      <Footer />
    </div>
  );
};

export default App;
