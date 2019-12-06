const Router = require('@koa/router');
const usersHandlers = require('./handlers/usersHandlers');


const router = new Router();

// Get all users
router.get('/users', usersHandlers.users);

// Get one user
router.get('/user/:id', usersHandlers.user);

// Add new user
router.post('/user', usersHandlers.createUser);

// Update user
router.put('/user/:id', usersHandlers.updateUser);

// Delete user
router.delete('/user/:id', usersHandlers.deleteUser);

module.exports = router;
