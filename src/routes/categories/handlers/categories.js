const CategoryService = require('../../../services/category');

module.exports.getCategories = async ctx => {
  const categoryService = new CategoryService();

  ctx.response.body = await categoryService.getCategories();
};

module.exports.getCategory = async ctx => {
  const categoryService = new CategoryService();
  const { id } = ctx.params;

  ctx.response.body = await categoryService.getCategory(id);
};

module.exports.createCategory = async ctx => {
  const categoryService = new CategoryService();
  const newCategory = ctx.request.body;

  ctx.response.body = await categoryService.createCategory(newCategory);
};

module.exports.updateCategory = async ctx => {
  const categoryService = new CategoryService();
  const { id } = ctx.params;
  const updatedCategory = ctx.request.body;

  ctx.response.body = await categoryService.updateCategory(id, updatedCategory);
};

module.exports.deleteCategory = async ctx => {
  const categoryService = new CategoryService();
  const { id } = ctx.params;

  ctx.response.body = await categoryService.deleteCategory(id);
};
