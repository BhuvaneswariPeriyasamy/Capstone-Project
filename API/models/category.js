const mongoose = require('mongoose');

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
const descriptionSchema = new mongoose.Schema({
  features: { type: String, required: true },
  dimensions: { type: String, required: true },
  materials: { type: String, required: true },
  careInstructions: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Automatically generate an ObjectId for this field
  },
  name: {
      type: String,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
  image: {
      type: String,
      required: true,
  },
  description: { type: descriptionSchema, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  products: [productSchema]
<<<<<<< HEAD
=======
=======
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageBase64: { type: String, required: true } // Base64 encoded image
>>>>>>> 1825b09ce5bdbffb16e38b96fed74b7dac5836c1
>>>>>>> 20b6e49b5aabff1a9be2b7a92f182021c4585590
});

module.exports = mongoose.model('Category', categorySchema);
