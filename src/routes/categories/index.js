const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categoriesHandlers.js');

const router = new Router();

// Get all categories with sub categories 
router.get('/categories', categoriesHandlers.getCategories);

// Delete category by id
router.delete('/category/:id', categoriesHandlers.deleteCategory);

module.exports = router;
