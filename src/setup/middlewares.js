const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

const errorHandler = require('../middleware/error-handler');
const router = require('../routes');

const { URL } = require('../config/env');

// Applying all middlewares
module.exports = app => {
  console.info('SETUP - Loading middlewares...');

  app.use(helmet());
  app.use(bodyParser());

  app.use(
    cors({
      origin: URL
    })
  );

  app.use(errorHandler);

  app.use(router);
};
