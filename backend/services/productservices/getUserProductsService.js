const Product = require('../../models/Product');

const getUserProductsService = async (userId) => {
  const products = await Product.find({ user: userId });
  return products;
};

module.exports = getUserProductsService;
