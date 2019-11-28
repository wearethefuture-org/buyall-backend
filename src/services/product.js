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

  async createProduct(product) {
    const createdProduct = await this.model.products.create(product);
    return this.getProduct(createdProduct.id);
  }

  async updateProduct(id, product) {
      await this.model.products.update(product, {
          where: {
              id
          }
      });

      return this.getProduct(id);
  }

  async deleteProduct(id) {
      return this.model.products.destroy({
          where: {
              id
          }
      });
  }
}

module.exports = ProductService;
