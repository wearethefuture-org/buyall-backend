const BaseModel = require('./baseModel');

class ProductService extends BaseModel {
  async getProducts() {
    return this.model.products.findAll({
      include: [
        {
          model: this.model.characteristicsValues,
          as: this.aliases.products.characteristicsValues
        },
        {
          model: this.model.subCategories,
          as: this.aliases.products.subCategories,
          include: [
            {
              model: this.model.characteristics,
              as: this.aliases.subCategories.characteristics
            }
          ]
        }
      ]
    });
  }

  async getProduct(id) {
    return this.model.products.findOne({
      where: {
        id
      },
      include: [
        {
          model: this.model.characteristicsValues,
          as: this.aliases.products.characteristicsValues
        },
        {
          model: this.model.subCategories,
          as: this.aliases.products.subCategories,
          include: [
            {
              model: this.model.characteristics,
              as: this.aliases.subCategories.characteristics
            }
          ]
        }
      ]
    });
  }
}

module.exports = ProductService;
