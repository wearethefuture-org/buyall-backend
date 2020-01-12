const BaseModel = require('./baseModel');
const ProductService = require('./product');

class OrderService extends BaseModel {
  async createOrder(body) {
    const productService = new ProductService();

    const product = await productService.getProduct(body.productId);

    const order = await this.model.orders.create(body);

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

  async updateOrder(id, body) {
    return this.model.orders.update(body, {
      where: {
        id
      }
    });
  }
}

module.exports = OrderService;
