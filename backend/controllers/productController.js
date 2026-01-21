const createProductService = require('../services/productservices/createProductService');
const getProductBySlugService = require('../services/productservices/getProductBySlugService');
const getUserProductsService = require('../services/productservices/getUserProductsService');

exports.createProduct = async (req, res) => {
  try {
    const product = await createProductService({ userId: req.user.id, ...req.body });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await getProductBySlugService(req.params.slug);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await getUserProductsService(req.user.id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
