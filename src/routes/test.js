const Router = require('@koa/router');

const router = new Router();

router.get('/test', async ctx => {
  ctx.response.body = 'Test';
});

module.exports = router;
