const Router = require('@koa/router');
const productsHandlers = require('./handlers/productsHandlers');
const { ProductsUrls } = require('../../enums/Urls');


const router = new Router();

// get all products
router.get(ProductsUrls.allList, productsHandlers.getProducts);

// get product by id
router.get(ProductsUrls.getById, productsHandlers.getProduct);

// create new product
router.post(ProductsUrls.create, productsHandlers.createProduct);

// update product
router.put(ProductsUrls.update, productsHandlers.updateProduct);

// delete product by id
router.delete(ProductsUrls.delete, productsHandlers.deleteProduct);

module.exports = router;
