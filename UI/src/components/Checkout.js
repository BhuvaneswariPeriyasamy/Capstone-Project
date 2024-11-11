import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [cart] = useState([]); // Assuming the cart items are passed or stored globally (like in local storage)
  const navigate = useNavigate();

  const handleShippingChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit order to server here (e.g., using Axios or Fetch)
    console.log('Order placed:', { shippingDetails, paymentDetails, cart });

    // Redirect user to order confirmation or thank you page
    navigate('/thank-you');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="shipping-details">
          <h2>Shipping Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingDetails.name}
            onChange={handleShippingChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={shippingDetails.address}
            onChange={handleShippingChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={shippingDetails.email}
            onChange={handleShippingChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={shippingDetails.phone}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div className="payment-details">
          <h2>Payment Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={paymentDetails.expiry}
            onChange={handlePaymentChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handlePaymentChange}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ${calculateTotal()}</h4>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
