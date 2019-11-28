const Router = require('@koa/router');
const productsHandlers = require('./handlers/productsHandlers');
const { ProductsUrls } = require('../../enums/Urls');


const router = new Router();

// get all products
router.get(ProductsUrls.allList, productsHandlers.getProducts);

module.exports = router;
