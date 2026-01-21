const Sale = require('../../models/Sale');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const recordSaleService = async (orderId) => {
  const order = await Order.findById(orderId).populate('product');
  if (!order) throw new Error('Order not found');
  if (order.status !== 'completed') throw new Error('Order not completed yet');

  const sale = new Sale({
    order: order._id,
    product: order.product._id,
    buyerName: order.buyerName,
    buyerEmail: order.buyerEmail,
    amount: order.totalAmount,
    soldAt: order.purchasedAt,
  });

  await sale.save();
  return sale;
};

module.exports = recordSaleService;
