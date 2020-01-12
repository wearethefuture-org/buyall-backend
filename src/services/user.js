const BaseModel = require('./baseModel');

class UserService extends BaseModel {
  async getUsers() {
    // TODO: delete passwords
    const users = this.model.users.findAll({});
  }

  async getUser(id) {
    const user = this.model.users.findOne({
      where: {
        id
      }
    });

    delete user.dataValues.password;

    return user;
  }

  async getUserByEmail(email) {
    const user = this.model.users.findOne({
      where: {
        email
      }
    });

    delete user.dataValues.password;

    return user;
  }

  async createUser(body) {
    const user = this.model.users.create(body);

    delete user.dataValues.password;

    return user;
  }

  async updateUser(id, body) {
    const user = this.model.users.update(body, {
      where: {
        id
      }
    });

    delete user.dataValues.password;

    return user;
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
