const BaseModel = require('./baseModel');

class SubCategoryService extends BaseModel {
  async getSubCategory(id) {
    return this.model.subCategories.findOne({
      where: {
        id
      },
      include: [{
        model: this.model.products,
        as: this.aliases.subCategories.products
      }]
    });
  }

  async getSubCategories() {
    return this.model.subCategories.findAll({
      include: [{
        model: this.model.products,
        as: this.aliases.subCategories.products
      }]
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