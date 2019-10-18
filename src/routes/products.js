const Router = require("@koa/router");

const products = require("./handlers/products/products");
const product = require("./handlers/products/product");
const addProduct = require("./handlers/products/addProduct");
const updateProduct = require("./handlers/products/updateProduct");
const deleteProduct = require("./handlers/products/deleteProduct");

const router = new Router();

// Get all products
router.get("/products", async ctx => {
  ctx.response.body = await products();
});

// Get one product
router.get("/product/:id", async ctx => {
  ctx.response.body = await product(ctx);
});

// Add new product
router.post("/product", async ctx => {
  ctx.response.body = await addProduct(ctx);
});

// Update product
router.put("/product/:id", async ctx => {
  ctx.response.body = await updateProduct(ctx);
});

// Delete product
router.delete("/product/:id", async ctx => {
  ctx.response.body = await deleteProduct(ctx);
});

module.exports = router;
