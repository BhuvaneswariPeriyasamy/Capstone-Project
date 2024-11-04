// routes/banner.js
const express =require('express');
const Banner=require('../models/banner');

const router = express.Router();

// GET route to fetch the banner image
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const banner = await Banner.findOne({ filename });

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({ image: banner.image }); // Return the base64 image data
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving banner image' });
  }
});

module.exports = router;
