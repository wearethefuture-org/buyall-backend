const { MongoClient, ObjectID } = require("mongodb");

const { mongoURL, databaseName } = require("../utils/config");

class DatabaseService {
  constructor() {
    this.database = null;
  }

  connect() {
    if (this.database) {
      return null;
    }
    return MongoClient.connect(mongoURL, { useNewUrlParser: true }).then(
      client => {
        this.database = client.db(databaseName);
        return this.database;
      }
    );
  }

  getDB() {
    return this.database;
  }

  static getPrimaryKey(id) {
    return ObjectID(id);
  }
}

const database = new DatabaseService();

module.exports = database;
