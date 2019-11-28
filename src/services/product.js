const BaseModel = require('./baseModel');

class ProductService extends BaseModel {
  async getProducts() {
    return this.model.products.findAll({
      include: [{
        model: this.model.characteristicsValues,
        as: this.aliases.products.characteristicsValues
      }]
    });
  }
}

module.exports = ProductService;
