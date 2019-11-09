const Koa = require('koa');

const setupMiddlewares = require('./setup/middlewares');
const setupDatabase = require('./setup/database');
const setupServer = require('./setup/server');

const app = new Koa();

setupMiddlewares(app);

setupDatabase();

setupServer(app);
