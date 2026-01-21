const Order = require('../../models/Order');
const Product = require('../../models/Product');

const createOrderService = async ({ productId, buyerName, buyerEmail, quantity = 1, shippingAddress }) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  const totalAmount = product.price * quantity;

  const order = new Order({
    product: productId,
    buyerName,
    buyerEmail,
    quantity,
    totalAmount,
    shippingAddress, // store shipping address
  });

  await order.save();
  return order;
};

module.exports = createOrderService;
