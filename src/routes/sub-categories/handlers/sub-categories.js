const SubCategoryService = require('../../../services/sub-category');

const subCategoryService = new SubCategoryService();

// Get all sub categories
module.exports.getSubCategories = async ctx => {
  ctx.response.body = await subCategoryService.getSubCategories();
};

// Get sub category
module.exports.getSubCategory = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await subCategoryService.getSubCategory(id);
};

// Create sub category
module.exports.createtSubCategory = async ctx => {
  const newSubCategory = ctx.request.body;

  ctx.response.body = await subCategoryService.createSubCategory(
    newSubCategory
  );
};

// Update sub category
module.exports.updateSubCategory = async ctx => {
  const { id } = ctx.params;
  const updatedSubCategory = ctx.request.body;

  ctx.response.body = await subCategoryService.updateSubCategory(
    id,
    updatedSubCategory
  );
};

// Delete sub category
module.exports.deleteSubCategory = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await subCategoryService.deleteSubCategory(id);
};
