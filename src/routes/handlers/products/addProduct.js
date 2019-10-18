const product = require("../../../services/product");

// Add new product
module.exports = async ctx => {
  const newProduct = ctx.request.body;
  return product.addProduct(newProduct);
};
