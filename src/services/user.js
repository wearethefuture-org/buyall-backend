const BaseModel = require('./baseModel');

class UserService extends BaseModel {
  async getUsers() {
    return this.model.users.findAll({});
  }

  async getUser(id) {
    return this.model.users.findOne({
      where: {
        id
      }
    });
  }

  async getUserByEmail(email) {
    return this.model.users.findOne({
      where: {
        email
      }
    });
  }

  async createUser(user) {
    return this.model.users.create(user);
  }

  async updateUser(id, user) {
    return this.model.users.update(user, {
      where: {
        id
      }
    });
  }

  async deleteUser(id) {
    return this.model.users.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = UserService;
