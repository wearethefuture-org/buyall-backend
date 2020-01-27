const UserService = require('../../../services/user');
const StorageService = require('../../../services/storage');

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
  const storageService = new StorageService();

  const { id } = ctx.params;
  const { body } = ctx.request;

  if (!ctx.file) {
    await userService.updateUser(id, body);
    ctx.response.body = await userService.getUser(id);
    return;
  }

  const file = await storageService.uploadFile(ctx.file, 'users-images/');

  body.imgId = file.id;

  await userService.updateUser(id, body);

  ctx.response.body = await userService.getUser(id);
};

module.exports = {
  createUser,
  deleteUser,
  user,
  users,
  updateUser
};