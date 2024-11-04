const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageBase64: { type: String, required: true } // Base64 encoded image
});

module.exports = mongoose.model('Category', categorySchema);
