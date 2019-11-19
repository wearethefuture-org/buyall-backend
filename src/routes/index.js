const combineRouters = require('../utils/combineRouters');

const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const subCategoriesRouter = require('./subCategories');
const authRouter = require('./auth');

const router = combineRouters([
    usersRouter,
    categoriesRouter,
    subCategoriesRouter,
    authRouter
]);

module.exports = router;
