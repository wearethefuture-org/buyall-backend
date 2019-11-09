const Router = require('@koa/router');
const subCategoriesHandlers = require('./handlers/sub-categories.js');

const router = new Router();

// Get all sub categories
router.get('/subCategories', subCategoriesHandlers.getSubCategories);

// Get sub category
router.get('/subCategory/:id', subCategoriesHandlers.getSubCategory);

// Create new sub category
router.post('/subCategory', subCategoriesHandlers.createtSubCategory);

// Update sub category
router.put('/subCategory/:id', subCategoriesHandlers.updateSubCategory);

// Delete sub category by id
router.delete('/subCategory/:id', subCategoriesHandlers.deleteSubCategory);

module.exports = router;
