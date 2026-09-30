const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} = require('../controllers/productControllers');
// const requireAuth = require('../middleware/requireAuth');

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// router.use(requireAuth);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
router.post('/', createProduct);

module.exports = router;
