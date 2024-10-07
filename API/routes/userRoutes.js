const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const Counter = require('../models/Counter');

const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
      { id: name }, // Find the document with id 'userId'
      { $inc: { seq: 1 } }, // Increment the `seq` field by 1
      { new: true, upsert: true } // Return the updated document or create it if it doesn't exist
    );
    return counter.seq;
  };

// Create a new user
router.post('/create', async (req, res) => {
    const { firstname, lastname, email, password, address, city, province, postalcode } = req.body;
  
    try {
      // Get the next auto-incremented userId
      const userId = await getNextSequence('userId');
      
      // Create a new user with the generated userId
      const newUser = new User({
        userId,
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        province,
        postalcode
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

   // Update a user by ID
   router.put('/update/:id', async (req, res) => {
    const { firstname, lastname, email, password, address, city, state, postalcode } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { userId: req.params.id },
        { firstname, lastname, email, password, address, city, state, postalcode },
        { new: true } // Return the updated document
      );
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
