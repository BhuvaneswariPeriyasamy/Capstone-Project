const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const admin = require('firebase-admin');
const mongoose = require('mongoose');

router.get('/product/:productId?', async (req, res) => {
    try {
        console.log("inside product")
        const productId = new mongoose.Types.ObjectId(req.params.productId); // Properly instantiate ObjectId
        const category = await Category.aggregate([
            { $unwind: '$products' },
            { $match: { 'products._id': productId } },
            { $limit: 1 }
        ]);
        console.log(category)
        if (category.length > 0) { // Check if any category was found
            const product = category[0].products;
            console.log(product);
            const imageFile = admin.storage().bucket().file(product.image);
            
            try {
                const [url] = await imageFile.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2025',
                });
                console.log(product);
                res.json({ ...product, imageUrl: url });
            } catch (imageError) {
                console.error(`Error fetching signed URL for ${product.image}:`, imageError);
                res.json({ ...product, imageUrl: null });
            }
        } else {
            res.status(404).json({ message: 'Product not found in any category' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ message: 'Error fetching product details', error });
    }
    console.log("end")
});

module.exports = router;