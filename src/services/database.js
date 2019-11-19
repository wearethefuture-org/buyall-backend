const Sequelize = require('sequelize');

const { databaseName, username, password, host } = require('../utils/config');

const database = new Sequelize(databaseName, username, password, {
  host,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = database;
