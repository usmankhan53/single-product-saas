const createOrderService = require('../services/orderservices/createOrderService');
const getOrdersByUserService = require('../services/orderservices/getOrdersByUserService');

// Record a new order (public endpoint)
exports.createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all orders and earnings for logged-in user (dashboard)
exports.getUserOrders = async (req, res) => {
  try {
    const result = await getOrdersByUserService(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
