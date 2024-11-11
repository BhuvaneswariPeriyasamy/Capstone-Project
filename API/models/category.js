const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('Category', categorySchema);
