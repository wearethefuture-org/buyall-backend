const Sequelize = require('sequelize');

const { NODE_ENV } = require('../config/env');
const databaseConfig = require('../config/database.json');

const config = databaseConfig[NODE_ENV];

const database = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = database;
