const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order=require('../models/order');

router.post('/placeOrder', authMiddleware, async (req, res) => {
  const { cartItems, userId, paymentMethod, paymentDetails } = req.body;

  try {
    // Logic for processing the order
    const order = new Order({
      userId,
      cartItems,
      paymentMethod,
      paymentDetails,
      orderDate: new Date(),
    });
    await order.save();

    res.status(200).json({ success: true, message: 'Order placed successfully.' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
});

module.exports = router;