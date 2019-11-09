const Koa = require('koa');

const setupMiddlewares = require('./setup/middlewares');
const setupDatabase = require('./setup/database');
const setupServer = require('./setup/server');

const app = new Koa();

// Setup middlewares
setupMiddlewares(app);

// Setup database
setupDatabase();

// Setup server
setupServer(app);
