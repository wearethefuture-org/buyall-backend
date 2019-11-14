const CategoryService = require('../../../services/category');

const getCategories = async ctx => {
    const categoryService = new CategoryService();

    ctx.response.body = await categoryService.getCategories();
};

const getCategory = async ctx => {
    const categoryService = new CategoryService();
    const { id } = ctx.params;

    ctx.response.body = await categoryService.getCategory(id); 
};

const createCategory = async ctx => {
    const categoryService = new CategoryService();
    const newCategory = ctx.request.body;

    ctx.response.body = await categoryService.createCategory(newCategory);
};

const updateCategory = async ctx => {
    const categoryService = new CategoryService();
    const { id } = ctx.params;
    const updatedCategory = ctx.request.body;

    ctx.response.body = await categoryService.updateCategory(id, updatedCategory);
};

const deleteCategory = async ctx => {
    const categoryService = new CategoryService();
    const {id} = ctx.params;

    ctx.response.body = await categoryService.deleteCategory(id);
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory 
};