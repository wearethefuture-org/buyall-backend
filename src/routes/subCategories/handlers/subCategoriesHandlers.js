const Promise = require('bluebird');
const SubCategoryService = require('../../../services/subCategory');
const CharacteristicService = require('../../../services/characteristic');
const ProductService = require('../../../services/product');

const getSubCategories = async ctx => {
    const subCategoryService = new SubCategoryService();
    const params = ctx.request.query;

    ctx.response.body = await subCategoryService.getSubCategories(params);
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
    const characteristicService = new CharacteristicService(); 
    const newSubCategory = ctx.request.body;

    const dbSubCategory = await subCategoryService.createSubCategory(newSubCategory);

    await Promise.each(newSubCategory.characteristicsSettings, async setting => {
        await characteristicService.createCharacteristicSetting(setting, dbSubCategory.dataValues.id);
    });

    ctx.response.body = await subCategoryService.getSubCategory(dbSubCategory.dataValues.id);
};

const updateSubCategory = async ctx => {
        const subCategoryService = new SubCategoryService();
        const characteristicService = new CharacteristicService();

        const { id } = ctx.params;
        const mustBeUpdatedSubCategory = ctx.request.body;

        await Promise.each(mustBeUpdatedSubCategory.characteristicsSettings, async setting => {
            await characteristicService.updateCharacteristicSetting(setting.id, setting);
        });

        const result = await subCategoryService.updateSubCategory(id, mustBeUpdatedSubCategory);

        ctx.response.body = result[0];
};

const deleteSubCategory = async ctx => {
    const subCategoryService = new SubCategoryService();
    const { id } = ctx.params;

    const subCategory = await subCategoryService.getSubCategory(id);

    await Promise.each(subCategory.characteristicsSettings, async setting => {
        await setting.subCategoryCharacteristics.destroy();
    });

    const res = await subCategoryService.deleteSubCategory(id);

    await Promise.each(subCategory.characteristicsSettings, async setting => {
        try {
            await setting.destroy();
        } catch (error) {
        }
    });

    ctx.response.body = res;
};

module.exports = {
    deleteSubCategory,
    createSubCategory,
    updateSubCategory,
    getSubCategory,
    getSubCategories,
    getSubCategoryProducts
}
