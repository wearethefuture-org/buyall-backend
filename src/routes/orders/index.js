const Router = require('@koa/router');
const ordersHandler = require('./handlers/ordersHandler');


const router = new Router();

router
    .prefix('/order')
    .post('/', ordersHandler.createOrder)
    .put('/:id', ordersHandler.updateOrder)
    .delete('/:id', ordersHandler.deleteOrder);

module.exports = router;
