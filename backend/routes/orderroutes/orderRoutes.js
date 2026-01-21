const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const authMiddleware = require('../../middleware/authMiddleware');

// Public endpoint: create order
router.post('/', orderController.createOrder);

// Protected endpoint: get user orders and earnings
router.get('/dashboard', authMiddleware, orderController.getUserOrders);

module.exports = router;
