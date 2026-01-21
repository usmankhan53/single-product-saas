const express = require('express');
const router = express.Router();
const salesController = require('../../controllers/salesController');
const authMiddleware = require('../../middleware/authMiddleware');

// Record sale (internal/public after payment)
router.post('/', salesController.recordSale);

// Get all sales for dashboard
router.get('/dashboard', authMiddleware, salesController.getUserSales);

module.exports = router;
