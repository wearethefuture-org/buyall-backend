const Model = require('../database/models');

class BaseModelService {
  constructor() {
    this.model = Model;
    this.transaction = null;
  }

  async beginTransaction() {
    this.transaction = await this.model.sequelize.transaction();
  }

  async commitTransaction() {
    if (this.transaction) {
      await this.transaction.commit();
    }
    this.transaction = null;
  }

  async rollbackTransaction() {
    if (this.transaction) {
      await this.transaction.rollback();
    }
    this.transaction = null;
  }
}

module.exports = BaseModelService;
