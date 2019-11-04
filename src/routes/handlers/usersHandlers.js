const UserService = require('../../services/user');

// Create new user
module.exports.createUser = async ctx => {
  const userService = new UserService();
  const newUser = ctx.request.body;

  ctx.response.body = await userService.createUser(newUser);
};

// Delete user
module.exports.deleteUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;

  ctx.response.body = await userService.deleteUser(id);
};

// Get one user
module.exports.user = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;

  ctx.response.body = await userService.getUser(id);
};

// Get all users
module.exports.users = async ctx => {
  const userService = new UserService();

  ctx.response.body = await userService.getUsers();
};

// Update user
module.exports.updateUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  const newUser = ctx.request.body;

  ctx.response.body = await userService.updateUser(id, newUser);
};