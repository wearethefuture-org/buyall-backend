const Promise = require('bluebird');
const BaseModel = require('./baseModel');

class SubCategoryService extends BaseModel {
  async getSubCategories(params) {
    const { limit = 30, offset = 0 } = params;

    return this.model.subCategories.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: this.model.characteristicsSettings,
          as: this.aliases.subCategories.characteristicsSettings
        }
      ]
    });
  }

  async getSubCategory(id) {
    return this.model.subCategories.findOne({
      where: {
        id
      },
      include: [
        {
          model: this.model.characteristicsSettings,
          as: this.aliases.subCategories.characteristicsSettings
        }
      ]
    });
  }

  async createSubCategory(subCategory) {
    return this.model.subCategories.create(subCategory);
  }

  async updateSubCategory(id, subCategory) {
    return this.model.subCategories.update(subCategory, {
      where: {
        id
      }
    });
  }

  async deleteSubCategory(id) {
    // TODO need refactor
    const products = await this.model.products.findAll({
      where: {
        subCategoryId: id
      },
      include: [{
        model: this.model.characteristicsValues,
        as: this.aliases.products.characteristicsValues
      }]
    });

    await Promise.each(products, async product => {
      await Promise.each(product.characteristicsValues, async value => {
        await value.destroy();
      });

      await product.destroy();
    });

    return this.model.subCategories.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = SubCategoryService;
