const Router = require('@koa/router');
const usersHandlers = require('./handlers/usersHandlers');
const authMiddleware = require('../../middleware/authHandler');

const router = new Router();

// Get all users
router.get('/users', authMiddleware, usersHandlers.users);

// Get one user
router.get('/user/:id', authMiddleware, usersHandlers.user);

// Add new user
router.post('/user', authMiddleware, usersHandlers.createUser);

// Update user
router.put('/user/:id', authMiddleware, usersHandlers.updateUser);

// Delete user
router.delete('/user/:id', authMiddleware, usersHandlers.deleteUser);

module.exports = router;
