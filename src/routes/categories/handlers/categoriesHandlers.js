const CategoryService = new (require('../../../services/category'))();

const getCategories = async ctx => {
    ctx.response.body = await CategoryService.getCategories();
};

const getCategory = async ctx => {
    const { id } = ctx.params;
    ctx.response.body = await CategoryService.getCategory(id); 
};

const createCategory = async ctx => {
    const newCategory = ctx.request.body;
    ctx.response.body = await CategoryService.createCategory(newCategory);
};

const updateCategory = async ctx => {
    const { id } = ctx.params;
    const updatedCategory = ctx.request.body;
    ctx.response.body = await CategoryService.updateCategory(id, updatedCategory);
};

const deleteCategory = async ctx => {
    const {id} = ctx.params;
    ctx.response.body = await CategoryService.deleteCategory(id);
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory 
}