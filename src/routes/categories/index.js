const Router = require('@koa/router');
const categoriesHandlers = require('./handlers/categoriesHandlers.js');
const { CategoryUrls } = require('../../enums/Urls');


const router = new Router();

// get all categories with sub categories 
router.get(CategoryUrls.allList, categoriesHandlers.getCategories);

// get category by id 
router.get(CategoryUrls.getById, categoriesHandlers.getCategory);

// add new category
router.post(CategoryUrls.create, categoriesHandlers.createCategory);

// update category
router.put(CategoryUrls.update, categoriesHandlers.updateCategory);

// Delete category by id
router.delete(CategoryUrls.delete, categoriesHandlers.deleteCategory);

module.exports = router;
