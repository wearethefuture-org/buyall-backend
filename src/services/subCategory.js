const BaseModel = require('./baseModel');

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
    return this.model.subCategories.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = SubCategoryService;
