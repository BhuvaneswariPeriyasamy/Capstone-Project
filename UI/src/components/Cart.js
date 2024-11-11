import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Function to handle adding product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to remove product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  // Function to change quantity of an item in the cart
  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  // Function to proceed to checkout
  const checkout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    min="1"
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  />
                </div>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <h2>Total: ${calculateTotal()}</h2>
        <button onClick={checkout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
