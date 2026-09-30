const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inventoryCount: { type: Number, required: true },
  supplier: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
