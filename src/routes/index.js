const combineRouters = require('../utils/combineRouters');

const usersRouter = require('./users');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const subCategoriesRouter = require('./subCategories');
const productsRouter = require('./products');
const characteristicsRouter = require('./characteristics');
const ordersRouter = require('./orders');

const router = combineRouters([
    usersRouter,
    authRouter,
    categoriesRouter,
    subCategoriesRouter,
    productsRouter,
    characteristicsRouter,
    ordersRouter 
]);

module.exports = router;
