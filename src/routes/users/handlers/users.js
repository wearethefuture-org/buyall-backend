const UserService = require('../../../services/user');

module.exports.createUser = async ctx => {
  const userService = new UserService();
  const newUser = ctx.request.body;
  ctx.response.body = await userService.createUser(newUser);
};

module.exports.deleteUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  ctx.response.body = await userService.deleteUser(id);
};

module.exports.user = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  ctx.response.body = await userService.getUser(id);
};

module.exports.users = async ctx => {
  const userService = new UserService();
  ctx.response.body = await userService.getUsers();
};

module.exports.updateUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  const newUser = ctx.request.body;
  ctx.response.body = await userService.updateUser(id, newUser);
};
