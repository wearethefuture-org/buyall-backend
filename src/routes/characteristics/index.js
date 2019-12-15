const Router = require('@koa/router');
const characteristicsHandlers = require('./handlers/characteristicsHandlers');


const router = new Router();

router.get('/setting/:id', characteristicsHandlers.getSetting);

module.exports = router;
