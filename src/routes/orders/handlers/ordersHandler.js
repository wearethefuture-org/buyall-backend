const OrderService = require('../../../services/orders');

const createOrder = async ctx => {
    const orderService = new OrderService();

    const { body } = ctx.request;

    ctx.response.body = await orderService.createOrder(body);
};

const updateOrder = async ctx => {
    const orderService = new OrderService();

    const { id } = ctx.params;
    const { body } = ctx.request;

    ctx.response.body = await orderService.updateOrder(id, body);
};

const deleteOrder = async ctx => {
    const orderService = new OrderService();

    const { id } = ctx.params;

    ctx.response.body = await orderService.deleteOrder(id);
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder
};