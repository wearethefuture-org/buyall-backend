const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categoriesHandlers.js');


const router = new Router();

// get all categories with sub categories 
router.get('/categories', categoriesHandlers.getCategories);

// get category by id 
router.get('/category/:id', categoriesHandlers.getCategory);

// add new category
router.post('/category', categoriesHandlers.createCategory);

// update category
router.put('/category/:id', categoriesHandlers.updateCategory);

// Delete category by id
router.delete('/category/:id', categoriesHandlers.deleteCategory);

module.exports = router;
