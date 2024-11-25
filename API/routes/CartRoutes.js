const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Mongoose Cart schema
const Category = require('../models/category');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to check authentication
const firebaseAdmin = require('firebase-admin');
const mongoose = require('mongoose');

// Add to Cart
router.post('/addtocart', authMiddleware, async (req, res) => {
  const { userId, items } = req.body;
  try {
    // Validate input
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid request data.' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, items: [] });
    }
    
    // Process items to add to the cart
    for (const item of items) {
      const { categoryId, productId, quantity,price } = item;
      console.log("price"+price);
      if ( !productId) {
        return res.status(400).json({ success: false, message: 'Missing categoryId or productId.' });
      }

      // Check if the product is already in the cart
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.productId.toString() === productId
      );

      if (existingItemIndex >= 0) {
        // Update the quantity if the product exists
        cart.items[existingItemIndex].quantity += quantity || 1;
      } else {
        // Add the new item
        cart.items.push({
          categoryId,
          productId,
          quantity: quantity || 1, // Default to 1 if not specified
          price,
        });
        console.log("cart items"+cart.items);
      }
    }
    const totalAmount=cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    console.log("Total Amount:"+totalAmount);
    cart.totalAmount = totalAmount;
    console.log(cart.totalAmount);
    await cart.save();
    res.status(200).json({ success: true, message: 'Product(s) added to cart successfully.' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to add product(s) to cart.' });
  }
});


// Get Cart Items
router.get('/usercart', authMiddleware, async (req, res) => {
  let userId; // Get user ID from session
  if(req.session!=null && req.session.user!=null){
    userId = req.session.user.id; 
  }

  try {
    // Fetch the user's cart from the database, populating the product details in the cart items
    const cart = await Cart.findOne({ userId }).populate('items.productId'); 

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user.' });
    }

    // Fetch product details for each item in the cart
    const updatedCartItems = await Promise.all(cart.items.map(async (item) => {
      // Fetch product details from the Category collection using the productId from the cart item

      const category = await Category.findOne({ 'products._id': item.productId });
      if (!category) {
        throw new Error('Category not found for product');
      }

      const product = category.products.find(product => product._id.toString() === item.productId.toString());
      if (!product) {
        throw new Error('Product not found in category');
      }

      // Fetch image URL from Firebase Storage
      const imageUrl = await getImageUrlFromFirebase(product.image); // Get image URL from Firebase Storage
      product.imageUrl = imageUrl; // Add image URL to the product data

      // Return updated cart item with product details
      return {
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl, // Include the image URL for the frontend
      };
    }));
    console.log(updatedCartItems)
    res.status(200).json({
      items: updatedCartItems,
      totalAmount: cart.totalAmount, // Include totalAmount from the cart table
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart items.' });
  }
});

// Remove Item from Cart
router.delete('/remove', async (req, res) => {
  let userId;
  if(req.session!=null && req.session.user!=null)
  {
    userId = req.session.user.id;
  }
   // Get user ID from session
  const { productId,use } = req.body; // Get productId from the URL parameters
  try {
    // Fetch the user's cart from the database
    const cart = await Cart.findOne({ userId: use }).populate('items.productId');
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user.' });
    }

     // Convert productId to ObjectId for comparison
     const productIdAsObjectId = new mongoose.Types.ObjectId(productId);

     // Find the index of the item to be removed
     const itemIndex = cart.items.findIndex(item => item.productId.toString() ===productId);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);
    const totalAmount=cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    console.log(totalAmount);
    cart.totalAmount = Number(totalAmount);

    await cart.save();
    res.status(200).json({ success: true, message: 'Product removed from cart successfully.' });
  } catch (error) {
    console.error('Error inside remove', error);
    res.status(500).json({ success: false, message: 'Failed to remove product from cart.' });
  }
});

// Update Item Quantity in Cart
router.put('/update/:productId', async (req, res) => {
  const userId = req.session.user.id; // Get user ID from session
  console.log("inside update")
  console.log(userId);
  const { productId } = req.params; // Get productId from the URL parameters
  const { quantity } = req.body; // Get the new quantity from the request body

  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid quantity value.' });
  }

  try {
    // Fetch the user's cart from the database
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user.' });
    }
    // Convert productId to ObjectId for comparison
    const productIdAsObjectId = new mongoose.Types.ObjectId(productId);

    // Find the index of the item to be removed
    const itemIndex = cart.items.findIndex(item => item.productId.toString() ===productId);
    console.log(itemIndex);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    // Update the quantity of the item in the cart
    cart.items[itemIndex].quantity = quantity;
    cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json({ success: true, message: 'Product quantity updated successfully.' });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ success: false, message: 'Failed to update product quantity.' });
  }
});

// Helper function to fetch image URL from Firebase Storage
async function getImageUrlFromFirebase(imageName) {
  const bucket = firebaseAdmin.storage().bucket(); // Get Firebase storage bucket
  const file = bucket.file(imageName); // Get the file reference from the storage bucket
  
  try {
    // Generate a signed URL to access the image stored in Firebase Storage
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Set expiration date far in the future
    });

    return url; // Return the signed URL to access the image
  } catch (error) {
    console.error('Error fetching image from Firebase:', error);
    return null; // Return null if there's an error fetching the image
  }
}

module.exports = router;
