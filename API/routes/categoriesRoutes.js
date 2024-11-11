const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const admin = require('firebase-admin');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        const categoriesWithUrls = await Promise.all(categories.map(async (category) => {

            const imageFile = admin.storage().bucket().file(category.image);
            try {
                // Get a signed URL for the image
                const [url] = await imageFile.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2025', // Set an appropriate expiration
                });
                return {
                    ...category._doc,
                    imageUrl: url,
                };
            } catch (err) {
                console.error(`Error fetching signed URL for ${category.image}:`, err);
                return { ...category._doc, imageUrl: null }; // Handle error fetching URL
            }
        }));

        res.json(categoriesWithUrls);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
