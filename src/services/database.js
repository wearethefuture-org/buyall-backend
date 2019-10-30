const Sequelize = require("sequelize");

const { postgreURL } = require("../utils/config");

const database = new Sequelize(postgreURL, {
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = database;
