const express = require('express');
const router = express.Router();
const Category = require('../models/category');
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

module.exports = router;
