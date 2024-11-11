// Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  const [address, setAddress] = useState({
    street: '',
    province: '',
    postalCode: '',
    country: '',
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    navigate('/thank-you');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* User Info Section */}
      <div className="section user-info">
        <h2>User Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      {/* Address Section */}
      <div className="section address-info">
        <h2>Address Details</h2>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={(e) => handleInputChange(e, setAddress)}
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={address.province}
          onChange={(e) => handleInputChange(e, setAddress)}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={(e) => handleInputChange(e, setAddress)}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={(e) => handleInputChange(e, setAddress)}
        />
      </div>

      {/* Card Details Section */}
      <div className="section card-info">
        <h2>Card Details</h2>
        <input
          type="number"
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={(e) => handleInputChange(e, setCardDetails)}
        />
        <input
          type="text"
          name="cardholderName"
          placeholder="Cardholder Name"
          value={cardDetails.cardholderName}
          onChange={(e) => handleInputChange(e, setCardDetails)}
        />
        <div className="card-details">
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date"
            value={cardDetails.expiry}
            onChange={(e) => handleInputChange(e, setCardDetails)}
          />
          <input
            type="number"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => handleInputChange(e, setCardDetails)}
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
