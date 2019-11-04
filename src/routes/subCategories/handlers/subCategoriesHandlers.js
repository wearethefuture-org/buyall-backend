const SubCategoryService = new (require('../../../services/subCategory'))();

const getSubCategories = async ctx => {
    ctx.response.body = await SubCategoryService.getSubCategories();
};

const getSubCategory = async ctx => {
    const { id } = ctx.params;
    ctx.response.body = await SubCategoryService.getSubCategory(id);
};

const createtSubCategory = async ctx => {
    const newCategory = ctx.request.body;
    ctx.response.body = await SubCategoryService.createSubCategory(newCategory);
};

const updateSubCategory = async ctx => {
    const { id } = ctx.params;
    const updatedSubCategory = ctx.request.body;

    ctx.response.body = await SubCategoryService.updateSubCategory(id, updatedSubCategory);
};

const deleteSubCategory = async ctx => {
    const {id} = ctx.params;
    ctx.response.body = await SubCategoryService.deleteSubCategory(id);
};

module.exports = {
    deleteSubCategory,
    createtSubCategory,
    updateSubCategory,
    getSubCategory,
    getSubCategories
}