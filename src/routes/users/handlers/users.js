const UserService = require('../../../services/user');

const userService = new UserService();

// Create user
module.exports.createUser = async ctx => {
  const newUser = ctx.request.body;

  ctx.response.body = await userService.createUser(newUser);
};

// Delete user
module.exports.deleteUser = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await userService.deleteUser(id);
};

// Get one user
module.exports.user = async ctx => {
  const { id } = ctx.params;

  ctx.response.body = await userService.getUser(id);
};

// Get all users
module.exports.users = async ctx => {
  ctx.response.body = await userService.getUsers();
};

// Update user
module.exports.updateUser = async ctx => {
  const { id } = ctx.params;
  const newUser = ctx.request.body;

  ctx.response.body = await userService.updateUser(id, newUser);
};
