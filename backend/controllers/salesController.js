const recordSaleService = require('../services/salesservices/recordSaleService');
const getSalesByUserService = require('../services/salesservices/getSalesByUserService');

// Record a sale (called after payment)
exports.recordSale = async (req, res) => {
  try {
    const { orderId } = req.body;
    const sale = await recordSaleService(orderId);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all sales for user dashboard
exports.getUserSales = async (req, res) => {
  try {
    const result = await getSalesByUserService(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
