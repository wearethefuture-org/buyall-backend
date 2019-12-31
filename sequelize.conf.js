/**
 * Loading env variables
 */
require('./src/services/env')(`${__dirname}/../`);

const {
  username,
  password,
  databaseName,
  host
} = require('./src/utils/config');

module.exports = {
  // development: {
    username,
    password,
    database: databaseName,
    host,
    dialect: 'postgres',
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true
    },
    migrationStorageTableName: 'sequelize_meta',
    migrationStorageTableSchema: 'sequelize_schema',
    logging: true
  // }
};
