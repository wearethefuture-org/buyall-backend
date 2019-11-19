const UserService = require('../../../services/user');

const createUser = async ctx => {
  const userService = new UserService();
  const newUser = ctx.request.body;
  ctx.response.body = await userService.createUser(newUser);
};

const deleteUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  ctx.response.body = await userService.deleteUser(id);
};

const user = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  ctx.response.body = await userService.getUser(id);
};

const users = async ctx => {
  const userService = new UserService();
  ctx.response.body = await userService.getUsers();
};

const updateUser = async ctx => {
  const userService = new UserService();
  const { id } = ctx.params;
  const newUser = ctx.request.body;
  ctx.response.body = await userService.updateUser(id, newUser);
};

module.exports = {
  createUser,
  deleteUser,
  user,
  users,
  updateUser
};