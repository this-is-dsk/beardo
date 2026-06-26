const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number }, // e.g., 20 for 20%
  category: { type: String, required: true },
  image: { type: String, required: true }, // Main image URL
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isLimitedTimeDeal: { type: Boolean, default: false },
  stock: { type: Number, required: true, default: 100 }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
