// routes/banner.js
const express =require('express');
const Banner=require('../models/banner');
const admin = require('firebase-admin');
const router = express.Router();

// GET route to fetch the banner image
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const banner = await Banner.findOne({ filename });

    if (!banner || !banner.image) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Firebase storage URL of the image
    const firebaseImageUrl = banner.image;
    console.log(firebaseImageUrl)
    
    // Get image from Firebase storage
    const file = admin.storage().bucket().file(firebaseImageUrl);

    // Create read stream and pipe image data to response
    const stream = file.createReadStream();
    stream.on('error', error => {
      console.error("Error retrieving image from Firebase:", error);
      res.status(500).send("Error retrieving image");
    });
    stream.pipe(res);

  } catch (error) {
    console.error("Error fetching logo:", error);
    res.status(500).json({ message: 'Error retrieving banner image' });
  }
});


module.exports = router;
