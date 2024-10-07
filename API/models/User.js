const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
   },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  Province: String,
  postalcode: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
