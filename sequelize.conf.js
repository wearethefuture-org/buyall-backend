const {
  username,
  password,
  databaseName,
  host
} = require('./src/helpers/config');

module.exports = {
  development: {
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
  }
};
