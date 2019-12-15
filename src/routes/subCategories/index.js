const Router = require('@koa/router');
const subCategoriesHandlers = require('./handlers/subCategoriesHandlers.js');


const router = new Router();

router.get('/subCategories', subCategoriesHandlers.getSubCategories);
router.get('/subCategoryProducts/:id', subCategoriesHandlers.getSubCategoryProducts);
router.get('/subCategory/:id', subCategoriesHandlers.getSubCategory);
router.post('/subCategory', subCategoriesHandlers.createSubCategory);
router.put('/subCategory/:id', subCategoriesHandlers.updateSubCategory);
router.delete('/subCategory/:id', subCategoriesHandlers.deleteSubCategory);

module.exports = router;
