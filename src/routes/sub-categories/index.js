const Router = require('@koa/router');
const subCategoriesHandlers = require('./handlers/sub-categories.js');

const router = new Router();

// get all sub categories
router.get('/subCategories', subCategoriesHandlers.getSubCategories);

// get sub category by id
router.get('/subCategory/:id', subCategoriesHandlers.getSubCategory);

// add new sub category
router.post('/subCategory', subCategoriesHandlers.createtSubCategory);

// update sub category
router.put('/subCategory/:id', subCategoriesHandlers.updateSubCategory);

// delete sub category by id
router.delete('/subCategory/:id', subCategoriesHandlers.deleteSubCategory);

module.exports = router;
