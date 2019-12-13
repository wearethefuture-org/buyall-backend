const BaseModel = require('./baseModel');
const Promise = require('bluebird');

class SubCategoryService extends BaseModel {
  async getSubCategories(offset = undefined, limit = undefined) {
    const params = {
      include: [
        {
          model: this.model.characteristicsSettings,
          as: this.aliases.subCategories.characteristicsSettings
        }
      ]
    };

    if (offset) { params.offset = offset; }

    if (limit) { params.limit = limit; }

    return this.model.subCategories.findAndCountAll(params);
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
