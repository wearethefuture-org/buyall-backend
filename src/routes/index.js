const combineRouters = require('../utils/combineRouters');

const usersRouter = require('./users');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const subCategoriesRouter = require('./subCategories');
const productsRouter = require('./products');

const router = combineRouters([
    usersRouter,
    authRouter,
    categoriesRouter,
    subCategoriesRouter,
    productsRouter
]);

module.exports = router;
