const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
  addedAt: {
    type: Date,
    default: Date.now, // Tracks when the product was added to the cart
  },
  price:{
    type: Number,
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true, // Ensures one cart per user
    ref: 'User', // Reference to the User model
  },
  totalAmount:{type: Number,},
  items: [cartItemSchema], // Array of cart items
});

module.exports = mongoose.model('Cart', cartSchema);
