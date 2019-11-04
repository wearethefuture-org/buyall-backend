const UserService = new (require('../../../services/user'))();

// Create new user
module.exports.createUser = async ctx => {
  const newUser = ctx.request.body;
  ctx.response.body = await UserService.createUser(newUser);
};

// Delete user
module.exports.deleteUser = async ctx => {
  const { id } = ctx.params;
  ctx.response.body = await UserService.deleteUser(id);
};

// Get one user
module.exports.user = async ctx => {
  const { id } = ctx.params;
  ctx.response.body = await UserService.getUser(id);
};

// Get all users
module.exports.users = async ctx => {
  ctx.response.body = await UserService.getUsers();
};

// Update user
module.exports.updateUser = async ctx => {
  const { id } = ctx.params;
  const newUser = ctx.request.body;
  ctx.response.body = await UserService.updateUser(id, newUser);
};