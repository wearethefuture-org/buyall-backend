const product = require("../../../services/product");

// Get one product
module.exports = async ctx => {
  const { id } = ctx.params;
  return product.getProduct(id);
};
