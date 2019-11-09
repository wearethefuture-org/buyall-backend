const SubCategoryService = require('../../../services/sub-category');

module.exports.getSubCategories = async ctx => {
  const subCategoryService = new SubCategoryService();

  ctx.response.body = await subCategoryService.getSubCategories();
};

module.exports.getSubCategory = async ctx => {
  const subCategoryService = new SubCategoryService();
  const { id } = ctx.params;

  ctx.response.body = await subCategoryService.getSubCategory(id);
};

module.exports.createtSubCategory = async ctx => {
  const subCategoryService = new SubCategoryService();
  const newSubCategory = ctx.request.body;

  ctx.response.body = await subCategoryService.createSubCategory(
    newSubCategory
  );
};

module.exports.updateSubCategory = async ctx => {
  const subCategoryService = new SubCategoryService();
  const { id } = ctx.params;
  const updatedSubCategory = ctx.request.body;

  ctx.response.body = await subCategoryService.updateSubCategory(
    id,
    updatedSubCategory
  );
};

module.exports.deleteSubCategory = async ctx => {
  const subCategoryService = new SubCategoryService();
  const { id } = ctx.params;

  ctx.response.body = await subCategoryService.deleteSubCategory(id);
};
