const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../controllers/productControllers');

router.post('/', createProduct)
router.get("/", getAllProducts)

module.exports = router;
