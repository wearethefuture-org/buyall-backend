const Router = require('@koa/router');
const productsHandlers = require('./handlers/productsHandlers');


const router = new Router();

// get all products
router.get('/products', productsHandlers.getProducts);

// get product by id
router.get('/product/:id', productsHandlers.getProduct);

// create new product
router.post('/product', productsHandlers.createProduct);

// update product
router.put('/product/:id', productsHandlers.updateProduct);

// delete product by id
router.delete('/product/:id', productsHandlers.deleteProduct);

module.exports = router;
