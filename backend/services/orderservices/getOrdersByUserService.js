const Order = require('../../models/Order');
const Product = require('../../models/Product');

const getOrdersByUserService = async (userId) => {
  // Find all products of this user
  const products = await Product.find({ user: userId });
  const productIds = products.map(p => p._id);

  // Get all orders for these products
  const orders = await Order.find({ product: { $in: productIds } }).populate('product', 'title slug');

  // Calculate total earnings
  const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return { orders, totalEarnings };
};

module.exports = getOrdersByUserService;
