const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categories.js');

const router = new Router();

// Get all categories with sub categories
router.get('/categories', categoriesHandlers.getCategories);

// Get category
router.get('/category/:id', categoriesHandlers.getCategory);

// Create new category
router.post('/category', categoriesHandlers.createCategory);

// Update category
router.put('/category/:id', categoriesHandlers.updateCategory);

// Delete category
router.delete('/category/:id', categoriesHandlers.deleteCategory);

module.exports = router;
