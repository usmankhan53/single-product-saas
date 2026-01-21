const Sale = require('../../models/Sale');
const Product = require('../../models/Product');

const getSalesByUserService = async (userId) => {
  const products = await Product.find({ user: userId });
  const productIds = products.map(p => p._id);

  const sales = await Sale.find({ product: { $in: productIds } }).populate('product', 'title slug');

  const totalEarnings = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return { sales, totalEarnings };
};

module.exports = getSalesByUserService;
