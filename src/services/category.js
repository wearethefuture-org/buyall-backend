const BaseModel = require('./baseModel');

class CategoryService extends BaseModel {
  async getCategories() {
    return this.model.categories.findAll({
      include: [{
        model: this.model.subCategories,
        as: 'subCategories'
      }]
    });
  }

  async getCategory(id) {
    return this.model.categories.findOne({
      where: {
        id
      },
      include: [{
        model: this.model.subCategories,
        as: 'subCategories'
      }]
    });
  }

  async updateCategory(id, category) {
    return this.model.categories.update(category, {
      where: {
        id
      }
    });
  }

  async createCategory(category) {
    return this.model.categories.create(category);
  }

  async deleteCategory(id) {
    return this.model.categories.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = CategoryService;