const { MongoClient, ObjectID } = require("mongodb");

const { mongoURL, databaseName } = require("../utils/config");
const product = require("./product");

function Database() {
  let db = null;

  const setCollections = () => {
    product.setCollection(db.collection("Products"));
  };

  this.connect = () => {
    if (db) {
      return null;
    }
    return MongoClient.connect(mongoURL, { useNewUrlParser: true }).then(
      client => {
        db = client.db(databaseName);
        setCollections();
        return db;
      }
    );
  };

  this.getDB = () => {
    return db;
  };

  this.getPrimaryKey = id => {
    return ObjectID(id);
  };
}

const database = new Database();

module.exports = database;
