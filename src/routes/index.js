const combineRouters = require('../helpers/combine-routers');

// User routes
const usersRouter = require('./users');

// Category routes
const categoriesRouter = require('./categories');

// Sub category routes
const subCategoriesRouter = require('./sub-categories');

const router = combineRouters([
  usersRouter,
  categoriesRouter,
  subCategoriesRouter
]);

module.exports = router;
