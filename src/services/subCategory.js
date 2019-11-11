const BaseModel = require('./baseModel');

class SubCategoryService extends BaseModel {
  async getSubCategory(id) {
    return this.model.subCategories.findAll({
      where: {
        id
      }
    });
  }

  async getSubCategories() {
    return this.model.subCategories.findAll({});
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