const CategoryService = require('../../../services/category');

const categoryService = new CategoryService();

// Get all categories
module.exports.getCategories = async ctx => {
  ctx.response.body = await categoryService.getCategories();
};

// Get category
module.exports.getCategory = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await categoryService.getCategory(id);
};

// Create category
module.exports.createCategory = async ctx => {
  const newCategory = ctx.request.body;

  ctx.response.body = await categoryService.createCategory(newCategory);
};

// Update category
module.exports.updateCategory = async ctx => {
  const { id } = ctx.params;
  const updatedCategory = ctx.request.body;

  ctx.response.body = await categoryService.updateCategory(id, updatedCategory);
};

// Delete category
module.exports.deleteCategory = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await categoryService.deleteCategory(id);
};
