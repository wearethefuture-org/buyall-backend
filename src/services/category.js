const BaseModel = require('./baseModel');

class CategoryService extends BaseModel {
  // get all categories with included sub categories
  async getCategories() {
    return this.model.categories.findAll({
      // add sub categories belong to category
      include: [{
        model: this.model.subCategories,
        as: 'subCategories',
        paranoid: false 
      }]
    });
  }

  // delete category by id
  async deleteCategory(id) {
    return this.model.categories.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = CategoryService;