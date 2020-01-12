const BaseModel = require('./baseModel');

class UserService extends BaseModel {
  async getUsers() {
    // TODO: delete passwords
    const users = await this.model.users.findAll({});

    return users;
  }

  async getUser(id) {
    const user = await this.model.users.findOne({
      where: {
        id
      },
      include: [{
        model: this.model.orders,
        as: this.aliases.users.orders
      }]
    });

    if (user) {
      delete user.dataValues.password;
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await this.model.users.findOne({
      where: {
        email
      },
      include: [{
        model: this.model.orders,
        as: this.aliases.users.orders
      }]
    });

    if (user) {
      delete user.dataValues.password;
    }

    return user;
  }

  async createUser(body) {
    const { id } = await this.model.users.create(body);
    
    const user = await this.model.users.findOne({
      where: {
        id
      },
      include: [{
        model: this.model.orders,
        as: this.aliases.users.orders
      }]
    });

    delete user.dataValues.password;

    return user;
  }

  async updateUser(id, body) {
    const user = await this.model.users.update(body, {
      where: {
        id
      },
      include: [{
        model: this.model.orders,
        as: this.aliases.users.orders
      }]
    });

    if (user) {
      delete user.dataValues.password;
    }

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
