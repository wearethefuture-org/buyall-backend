const Router = require("@koa/router");

const productsHandlers = require("./handlers/productsHandlers");

const router = new Router();

// Get all products
router.get("/products", productsHandlers.products);

// Get one product
router.get("/product/:id", productsHandlers.product);

// Add new product
router.post("/product", productsHandlers.addProduct);

// Update product
router.put("/product/:id", productsHandlers.updateProduct);

// Delete product
router.delete("/product/:id", productsHandlers.deleteProduct);

module.exports = router;
