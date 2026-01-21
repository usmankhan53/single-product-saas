const Product = require('../../models/Product');
const crypto = require('crypto');

const createProductService = async ({ userId, title, description, price, images = [] }) => {
  // Generate unique slug
  const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + crypto.randomBytes(4).toString('hex');

  const product = new Product({
    user: userId,
    title,
    description,
    price,
    images, // store multiple images
    slug,
  });

  await product.save();

  return product;
};

module.exports = createProductService;
