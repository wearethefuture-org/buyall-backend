const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const aliases = require('./aliases');
const relations = require('./relations');

const sequelize = require('../../services/database');

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(`${__dirname}/sources`)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, 'sources', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.aliases = aliases;

relations(db);

module.exports = db;
