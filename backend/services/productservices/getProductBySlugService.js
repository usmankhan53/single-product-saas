const Product = require('../../models/Product');

const getProductBySlugService = async (slug) => {
  const product = await Product.findOne({ slug }).populate('user', 'name email');
  if (!product) throw new Error('Product not found');
  return product;
};

module.exports = getProductBySlugService;
