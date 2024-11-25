import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/usercart', {
          withCredentials: true,
        });
        setCart({
          items: response.data.items, // Cart items from the backend
          totalAmount: response.data.totalAmount, // Total amount from the backend
        });
      } catch (error) {
        console.error('Error fetching cart:', error);
        navigate('/login'); // Redirect to login if fetching cart fails
      }
    };

    fetchCartItems();
  }, [navigate]);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/remove`, {
        data: { productId },
        withCredentials: true,
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId !== productId),
      }));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;
      const response = await axios.put(
        `http://localhost:5000/cart/update/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      const { totalAmount } = response.data;
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        totalAmount,
        ),
      }));
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const checkout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                  />
                </div>
                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <h2>Total: ${cart.totalAmount.toFixed(2)}</h2>
        <button onClick={checkout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
