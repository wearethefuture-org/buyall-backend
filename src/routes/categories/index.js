const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categoriesHandlers.js');


const router = new Router();

router.get('/categories', categoriesHandlers.getCategories);
router.get('/category/:id', categoriesHandlers.getCategory);
router.post('/category', categoriesHandlers.createCategory);
router.put('/category/:id', categoriesHandlers.updateCategory);
router.delete('/category/:id', categoriesHandlers.deleteCategory);

module.exports = router;
