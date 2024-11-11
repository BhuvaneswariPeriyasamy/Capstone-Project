import React, { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';

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
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/productdetails/product/:productId" element={<ProductDetails />} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
