const mongoose = require('mongoose');
const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const result = await Product.create({ ...data });
    if (!result) {
      res.status(400).json({ message: 'Sorry, failed to create....' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct };
