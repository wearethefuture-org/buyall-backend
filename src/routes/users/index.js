const Router = require('@koa/router');
const usersHandlers = require('./handlers/usersHandlers');

const router = new Router();

router.prefix('/user');
router.get('/', usersHandlers.users);
router.get('/:id', usersHandlers.user);
router.post('', usersHandlers.createUser);
router.put('/:id', usersHandlers.updateUser);
router.delete('/:id', usersHandlers.deleteUser);
router.post('/:id/image', usersHandlers.uploadImage);

module.exports = router;
