// routes/banner.js
const express =require('express');
const Banner=require('../models/banner');
<<<<<<< HEAD
const admin = require('firebase-admin');
=======
<<<<<<< HEAD
const admin = require('firebase-admin');
=======

>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
const router = express.Router();

// GET route to fetch the banner image
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const banner = await Banner.findOne({ filename });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
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
<<<<<<< HEAD
=======
=======
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({ image: banner.image }); // Return the base64 image data
  } catch (error) {
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
    res.status(500).json({ message: 'Error retrieving banner image' });
  }
});

<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
module.exports = router;
