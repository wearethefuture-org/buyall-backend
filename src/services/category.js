const BaseModel = require('./base-model');

class CategoryService extends BaseModel {
  async getCategories() {
    return this.model.categories.findAll({
      // add sub categories belong to category
      include: [
        {
          model: this.model.subCategories,
          as: 'subCategories',
          paranoid: false
        }
      ]
    });
  }

  async getCategory(id) {
    return this.model.categories.findAll({
      where: {
        id
      },
      // add sub categories belong to category
      include: [
        {
          model: this.model.subCategories,
          as: 'subCategories',
          paranoid: false
        }
      ]
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
