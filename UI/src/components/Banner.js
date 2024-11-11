import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [bannerSrc, setBannerSrc] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/banner/banner', {
        responseType: 'blob'
    }) // Replace with the actual filename
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setBannerSrc(url); // Set the base64 image source
      })
      .catch((error) => console.error('Error loading banner:', error));
  }, []);

  return (
    <div className="banner">
      {bannerSrc ? <img src={bannerSrc} alt="Store Banner" /> : 'Loading...'}
    </div>
  );
};

export default Banner;
