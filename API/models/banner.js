const mongoose=require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String, // Store the base64-encoded image as a string
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Banner', bannerSchema);
