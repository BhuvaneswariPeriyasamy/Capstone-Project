// Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([
    {
      _id: '1',
      name: 'Sofa',
      price: 250.00,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/150', // Sample image URL
    },
    {
      _id: '2',
      name: 'Dining Table',
      price: 150.00,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/150', // Sample image URL
    },
  ]);

  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  const checkout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
                <div className='quantity'>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
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
