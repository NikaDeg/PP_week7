const mongoose = require('mongoose');
const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  // const userId = req.user._id;
  try {
    const data = req.body;
    const result = await Product.create({ ...data });
    if (!result) {
      res.status(400).json({ message: 'Sorry, failed to create....' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send('not a valid id');
  }
  try {
    const result = await Product.findOneAndDelete({ _id: id });
    if (!result) {
      res.status(404).json({ message: 'Not deleted' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send('not a valid id');
  }
  try {
    const productById = await Product.findById(id);
    if (productById) {
      res.status(200).json(productById);
    } else {
      res.status(404).send('invalid ID');
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send('not a valid id');
  }
  const updatedData = req.body;
  try {
    const update = await Product.findByIdAndUpdate(
      { _id: id },
      { ...updatedData },
      { returnDocument: 'after' },
    );
    if (!update) {
      res.status(404).send('update failed');
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = { createProduct, getAllProducts, deleteProduct, getProductById, updateProduct };
