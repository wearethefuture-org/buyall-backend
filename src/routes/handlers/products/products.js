const product = require("../../../services/product");

// Get all products
module.exports = async () => {
  return product.getProducts();
};
