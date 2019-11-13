const Router = require('@koa/router');
const subCategoriesHandlers = require('./handlers/subCategoriesHandlers.js');
const authMiddleware = require('../../middleware/authHandler');

const router = new Router();

// get all sub categories 
router.get('/subCategories', authMiddleware, subCategoriesHandlers.getSubCategories);

// get sub category by id 
router.get('/subCategory/:id', authMiddleware, subCategoriesHandlers.getSubCategory);

// add new sub category
router.post('/subCategory', authMiddleware, subCategoriesHandlers.createtSubCategory);

// update sub category
router.put('/subCategory/:id', authMiddleware, subCategoriesHandlers.updateSubCategory);

// delete sub category by id
router.delete('/subCategory/:id', authMiddleware, subCategoriesHandlers.deleteSubCategory);

module.exports = router;