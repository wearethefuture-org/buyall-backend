const combineRouters = require("koa-combine-routers");

const productsRouter = require("./products");

const router = combineRouters([productsRouter]);

module.exports = router;
