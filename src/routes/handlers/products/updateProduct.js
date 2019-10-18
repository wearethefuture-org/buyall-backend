const product = require("../../../services/product");

// Update product
module.exports = async ctx => {
  const { id } = ctx.params;
  const newProduct = ctx.request.body;
  return product.updateProduct(id, newProduct);
};
