const combineRouters = require('../utils/combineRouters');

// user routes
const usersRouter = require('./users');
// category routes
const categoriesRouter = require('./categories');
// sub category routes
const subCategoriesRouter = require('./subCategories');

const router = combineRouters([
    usersRouter,
    categoriesRouter,
    subCategoriesRouter
]);

module.exports = router;
