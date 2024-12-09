const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // Path to your Category model
const Order = require('../models/order');
const User = require('../models/User');
const admin = require('firebase-admin');
const Counter = require("../models/Counter");


// Add a new category
router.post('/categories', async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({ message: 'Name and Image are required' });
        }
        const newCategory = new Category({ name, image });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error });
    }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders." });
    }
  });

// Add a product to a specific category
router.post('/categories/:categoryName/products', async (req, res) => {
    try {
        const { categoryName } = req.params;
        const { name, price, image, description } = req.body;

        if (!name || !price || !image || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newProduct = {
            name,
            price,
            image,
            description,
        };

        category.products.push(newProduct);
        await category.save();

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

// Delete a product from a specific category
router.delete('/categories/:categoryName/products/:productId', async (req, res) => {
    try {
        const { categoryName, productId } = req.params;

        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const productIndex = category.products.findIndex(
            (product) => product._id.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        category.products.splice(productIndex, 1);
        await category.save();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});


  
  // Delete an order by ID
  router.delete("/orders/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Order.findByIdAndDelete(id);
      res.json({ message: "Order deleted successfully!" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Failed to delete order." });
    }
  });
  
  // Update order status
  router.put("/orders/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      order.orderStatus = status;
      await order.save();
      res.json({ message: "Order status updated successfully!" });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status." });
    }
  });

  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });
  
  // Add a new user
  router.post('/users', async (req, res) => {
    const { firstname, lastname, userType, email, password, address, city, Province, postalcode } = req.body;
    const userId = await getNextSequence("userId");
    try {
      const newUser = new User({ userId, firstname, lastname, userType, email, password, address, city, Province, postalcode });
      await newUser.save();
      res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
      res.status(400).json({ message: 'Error adding user', error });
    }
  });
  
  // Delete a user
  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await User.findOneAndDelete({ userId: id });
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  });

  const getNextSequence = async (name) => {
    const counter = await Counter.findOneAndUpdate(
      { id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return counter.seq;
  };

  

module.exports = router;
