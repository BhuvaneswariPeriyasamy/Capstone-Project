const express = require('express');
const router = express.Router();
const Category = require('../models/category');
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
let gfs= require("../server.js");

router.get('/', async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
    
router.get('/:id/image', async (req, res) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ err: 'No file exists' });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
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


<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> a3b5cdbd0f7cb2e7446d5ab6889827c4c0dc1d16
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590

module.exports = router;
