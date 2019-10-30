const combineRouters = require("koa-combine-routers");

const usersRouter = require("./users");

const router = combineRouters([usersRouter]);

module.exports = router;
