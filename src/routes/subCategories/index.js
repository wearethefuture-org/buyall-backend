const Router = require('@koa/router');
const subCategoriesHandlers = require('./handlers/subCategoriesHandlers.js');
const { SubCategoryUrls } = require('../../enums/Urls');


const router = new Router();

// get all sub categories 
router.get(SubCategoryUrls.allList, subCategoriesHandlers.getSubCategories);

// get sub category by id 
router.get(SubCategoryUrls.getById, subCategoriesHandlers.getSubCategory);

// add new sub category
router.post(SubCategoryUrls.create, subCategoriesHandlers.createtSubCategory);

// update sub category
router.put(SubCategoryUrls.update, subCategoriesHandlers.updateSubCategory);

// delete sub category by id
router.delete(SubCategoryUrls.delete, subCategoriesHandlers.deleteSubCategory);

module.exports = router;