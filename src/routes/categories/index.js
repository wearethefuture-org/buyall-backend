const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categoriesHandlers.js');
const authMiddleware = require('../../middleware/authHandler');

const router = new Router();

// get all categories with sub categories 
router.get('/categories', authMiddleware, categoriesHandlers.getCategories);

// get category by id 
router.get('/category/:id', authMiddleware, categoriesHandlers.getCategory);

// add new category
router.post('/category', authMiddleware, categoriesHandlers.createCategory);

// update category
router.put('/category/:id', authMiddleware, categoriesHandlers.updateCategory);

// Delete category by id
router.delete('/category/:id', authMiddleware, categoriesHandlers.deleteCategory);

module.exports = router;
