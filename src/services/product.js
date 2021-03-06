const BaseModel = require('./baseModel');

class ProductService extends BaseModel {
  async getProducts(offset = undefined, limit = undefined) {
    const params = {
      include: [
        {
          model: this.model.characteristicsValues,
          as: this.aliases.products.characteristicsValues
        },
        {
          model: this.model.files,
          as: this.aliases.products.previewImage,
        },
        {
          model: this.model.files,
          as: this.aliases.products.images
        },
        {
          model: this.model.comments,
          as: this.aliases.products.comments
        }
      ]
    };

    if (offset) { params.offset = offset; }

    if (limit) { params.limit = limit; }

    return this.model.products.findAndCountAll(params);
  }

  async getProductsBySubCategoryId(subCategoryId, offset = undefined, limit = undefined) {
    const params = {
      where: {
        subCategoryId
      },
      include: [
        {
          model: this.model.characteristicsValues,
          as: this.aliases.products.characteristicsValues
        },
        {
          model: this.model.files,
          as: this.aliases.products.previewImage,
        },
        {
          model: this.model.files,
          as: this.aliases.products.images
        },
        {
          model: this.model.comments,
          as: this.aliases.products.comments
        }
      ]
    };

    if (offset) { params.offset = offset; }

    if (limit) { params.limit = limit; }

    return this.model.products.findAndCountAll(params);
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
          model: this.model.files,
          as: this.aliases.products.previewImage,
        },
        {
          model: this.model.files,
          as: this.aliases.products.images
        },
        {
          model: this.model.comments,
          as: this.aliases.products.comments
        }
      ]
    });
  }

  async createProduct(product) {
    const createdProduct = await this.model.products.create(product);
    return this.getProduct(createdProduct.id);
  }

  async updateProduct(id, product) {
    return await this.model.products.update(product, {
        where: {
          id
        }
    });
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
