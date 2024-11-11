const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const admin = require('firebase-admin');
const mongoose = require('mongoose');


router.get('/category/:categoryId?', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        let products = [];

        if (categoryId) {
            // Fetch products for a specific category
            const category = await Category.findById(categoryId);
            if (category) {
                products = category.products;
            }
        } else {
            // Fetch all products across all categories
            const categories = await Category.find();
            products = categories.flatMap(category => category.products);
        }
        // Generate signed URLs for each product's image
        const productsWithUrls = await Promise.all(products.map(async (product) => {
            const imageFile = admin.storage().bucket().file(product.image);
            try {
                const [url] = await imageFile.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2025', // Set an appropriate expiration
                });

                return {
                    ...product._doc,
                    imageUrl: url, // Include the signed URL for the image
                };
            } catch (err) {
                console.error(`Error fetching signed URL for ${product.image}:`, err);
                return {
                    ...product._doc,
                    imageUrl: null, // Handle error by setting imageUrl to null
                };
            }
        }));
        res.json(productsWithUrls);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

module.exports = router;
