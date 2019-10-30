const User = require("../db/models/user");

class UserService extends User {
  async getUsers() {
    return this.findAll({});
  }

  async getUser(id) {
    return this.findAll({
      where: {
        id
      }
    });
  }

  async createUser(user) {
    return this.create(user);
  }

  async updateUser(id, user) {
    return this.update(user, {
      where: {
        id
      }
    });
  }

  async deleteUser(id) {
    return this.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = UserService;
