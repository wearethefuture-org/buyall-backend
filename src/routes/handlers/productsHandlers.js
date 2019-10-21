const ProductService = require("../../services/product");
const database = require("../../services/database");

// Add new product
module.exports.addProduct = async ctx => {
  const productService = new ProductService(database);
  const newProduct = ctx.request.body;

  ctx.response.body = await productService.addProduct(newProduct);
};

// Delete product
module.exports.deleteProduct = async ctx => {
  const productService = new ProductService(database);
  const { id } = ctx.params;

  ctx.response.body = await productService.deleteProduct(id);
};

// Get one product
module.exports.product = async ctx => {
  const productService = new ProductService(database);
  const { id } = ctx.params;

  ctx.response.body = await productService.getProduct(id);
};

// Get all products
module.exports.products = async ctx => {
  const productService = new ProductService(database);
  ctx.response.body = await productService.getProducts();
};

// Update product
module.exports.updateProduct = async ctx => {
  const productService = new ProductService(database);
  const { id } = ctx.params;
  const newProduct = ctx.request.body;

  ctx.response.body = await productService.updateProduct(id, newProduct);
};
