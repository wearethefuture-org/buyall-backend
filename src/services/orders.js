const BaseModel = require('./baseModel');
const ProductService = require('./product');

class OrderService extends BaseModel {
  async createOrder(body) {
    const productService = new ProductService();

    const order = await this.model.orders.create(body);

    const product = await productService.getProduct(body.productId);

    order.dataValues.product = product;

    return order;
  }

  async getOrder(id) {
    return this.model.orders.findOne({
      where: {
        id
      }
    });
  }

  async getOrderByUserProductId(productId, userId) {
    return this.model.orders.findOne({
      where: {
        productId,
        userId
      }
    });
  }

  async updateOrder(id, body) {
    const productService = new ProductService();

    await this.model.orders.update(body, {
      where: {
        id
      }
    });

    const order = await this.model.orders.findOne({
      where: {
        id
      }
    });

    const product = await productService.getProduct(order.dataValues.productId);

    order.dataValues.product = product;

    return order;
  }
}

module.exports = OrderService;
