// src/components/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
 // Make sure to add a CSS file to style the page

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been successfully processed.</p>
      <p>We appreciate your business and will process your order shortly.</p>
      
      <div className="button-container">
        <Link to="/" className="home-button">Return to Home</Link>
      </div>
    </div>
  );
};

export default ThankYou;
