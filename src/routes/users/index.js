const Router = require('@koa/router');
const usersHandlers = require('./handlers/usersHandlers');
const UserUrls = require('../../enums/UserUrls');

const router = new Router();

// Get all users
router.get(UserUrls.allList, usersHandlers.users);

// Get one user
router.get(UserUrls.getById, usersHandlers.user);

// Add new user
router.post(UserUrls.create, usersHandlers.createUser);

// Update user
router.put(UserUrls.update, usersHandlers.updateUser);

// Delete user
router.delete(UserUrls.delete, usersHandlers.deleteUser);

module.exports = router;
