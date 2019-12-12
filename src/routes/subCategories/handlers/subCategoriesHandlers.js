const SubCategoryService = require('../../../services/subCategory');
const ProductService = require('../../../services/product');

const getSubCategories = async ctx => {
    const subCategoryService = new SubCategoryService();

    const offset = ctx.request.query.offset;
    const limit = ctx.request.query.limit;

    ctx.response.body = await subCategoryService.getSubCategories(offset, limit);
};

const getSubCategoryProducts = async ctx => {
    const productService = new ProductService();
    const { id } = ctx.params;

    const offset = ctx.request.query.offset;
    const limit = ctx.request.query.limit;

    ctx.response.body = await productService.getProductsBySubCategoryId(id, offset, limit);
};

const getSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const { id } = ctx.params;

    ctx.response.body = await subCategoryService.getSubCategory(id);
};

const createSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const newSubCategory = ctx.request.body;

    ctx.response.body = await subCategoryService.createSubCategory(newSubCategory);
};

const updateSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const { id } = ctx.params;
    const updatedSubCategory = ctx.request.body;

    ctx.response.body = await subCategoryService.updateSubCategory(id, updatedSubCategory);
};

const deleteSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const {id} = ctx.params;

    ctx.response.body = await subCategoryService.deleteSubCategory(id);
};

module.exports = {
    deleteSubCategory,
    createSubCategory,
    updateSubCategory,
    getSubCategory,
    getSubCategories,
    getSubCategoryProducts
}