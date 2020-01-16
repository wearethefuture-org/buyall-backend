const Router = require('@koa/router');
const envHandlers = require('./handlers/envHandlers');

const router = new Router();

router.get('/env', envHandlers.getVars);

module.exports = router;
