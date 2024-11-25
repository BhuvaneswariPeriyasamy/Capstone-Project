import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  useEffect(() => {
    let isMounted = true; // To track component mount state

    // Fetch cart items
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/usercart', { withCredentials: true });
        if (isMounted) {
          setCartItems(response.data.items || []);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching cart items:', error);
          setCartItems([]); // Fallback to empty array
        }
      }
    };

    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:5000/users/session', { withCredentials: true });
        const userId = sessionResponse.data.id;

        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`, { withCredentials: true });
        if (isMounted) {
          setUserDetails(userResponse.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user details:', error);
          setUserDetails({});
        }
      }
    };

    fetchCartItems();
    fetchUserDetails();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const orderData = {
        userId: userDetails._id,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        shippingAddress: {
          address: userDetails.address || 'N/A',
          city: userDetails.city || 'N/A',
          state: userDetails.state || 'N/A',
          postalCode: userDetails.postalcode || 'N/A',
        },
        paymentMethod: 'Credit Card',
        paymentDetails: creditCardDetails,
        orderStatus: 'Pending',
        totalAmount,
      };

      await axios.post('http://localhost:5000/checkout/placeOrder', orderData, { withCredentials: true });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form class="cart-page-nn">
        {/* Cart Details */}
        <section class="cart-nn">
          <h2>Your Cart</h2>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item-nn">
                <label>
                  Product Name:
                  <input type="text" value={item.name} readOnly />
                </label>
                <label>
                  Quantity:
                  <input type="number" value={item.quantity} readOnly />
                </label>
                <label>
                  Price:
                  <input type="text" value={`$${item.price}`} readOnly />
                </label>
              </div>
            ))
          ) : (
            <p>Your cart is empty or loading...</p>
          )}
        </section>

        {/* Address Details */}
        <section  class="cart-nn">
          <h2>Shipping Address</h2>
          {userDetails.address ? (
            <div className="cart-item-nn">
              <label>
                Address:
                <input type="text" value={userDetails.address} readOnly />
              </label>
              <label>
                City:
                <input type="text" value={userDetails.city} readOnly />
              </label>
              <label>
                Postal Code:
                <input type="text" value={userDetails.postalcode} readOnly />
              </label>
            </div>
          ) : (
            <p>Loading address...</p>
          )}
        </section>

        {/* Payment Details */}
        <section>
          <h2>Payment Details</h2>
          <div className="payment-info">
            <label>
              Cardholder Name:
              <input
                type="text"
                name="cardHolderName"
                value={creditCardDetails.cardHolderName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={creditCardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength={16}
                required
              />
            </label>
            <label>
              Expiry Date (MM/YY):
              <input
                type="text"
                name="expiryDate"
                value={creditCardDetails.expiryDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              CVV:
              <input
                type="password"
                name="cvv"
                value={creditCardDetails.cvv}
                onChange={handleInputChange}
                maxLength={3}
                required
              />
            </label>
          </div>
        </section>

        {/* Place Order */}
        <div className="button-container">
          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
