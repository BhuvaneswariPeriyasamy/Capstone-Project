import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
  const [bannerSrc, setBannerSrc] = useState('');

  useEffect(() => {
    axios
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
      .get('http://localhost:5000/banner/banner', {
        responseType: 'blob'
    }) // Replace with the actual filename
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setBannerSrc(url); // Set the base64 image source
<<<<<<< HEAD
=======
=======
      .get('http://localhost:5000/banner/banner') // Replace with the actual filename
      .then((response) => {
        const base64Image = response.data.image;
        setBannerSrc(`${base64Image}`); // Set the base64 image source
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
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
