const compose = require('koa-compose');

function combineRouters(routers) {
  const middleware = [];

  routers.forEach(router => {
    middleware.push(router.routes());
    middleware.push(router.allowedMethods());
  });

  return compose(middleware);
}

module.exports = combineRouters;
