const product = require("../../../services/product");

// Delete product
module.exports = async ctx => {
  const { id } = ctx.params;
  return product.deleteProduct(id);
};
