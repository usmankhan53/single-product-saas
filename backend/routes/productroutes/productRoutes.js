const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const authMiddleware = require('../../middleware/authMiddleware');

// Create product (protected)
router.post('/', authMiddleware, productController.createProduct);

// Get product by slug (public)
router.get('/:slug', productController.getProductBySlug);

// Get all products of logged-in user (dashboard)
router.get('/', authMiddleware, productController.getUserProducts);

module.exports = router;
