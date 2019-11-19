const SubCategoryService = require('../../../services/subCategory');

const getSubCategories = async ctx => {
    const subCategoryService = new SubCategoryService();

    ctx.response.body = await subCategoryService.getSubCategories();
};

const getSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const { id } = ctx.params;

    ctx.response.body = await subCategoryService.getSubCategory(id);
};

const createtSubCategory = async ctx => {
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
    createtSubCategory,
    updateSubCategory,
    getSubCategory,
    getSubCategories
}