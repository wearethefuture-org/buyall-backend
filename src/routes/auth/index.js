const Router = require('@koa/router');
const authHandlers = require('./handlers/authHandlers.js');

const router = new Router();

router.post('/auth/login', authHandlers.login);
router.post('/auth/register', authHandlers.register);
router.post('/auth/sendForgot', authHandlers.sendForgotPasswordKey);

// check forgot password key 
router.post('/auth/checkKey', authHandlers.checkForgotPasswordKey);

router.post('/auth/changePassword', authHandlers.changePassword);
router.post('/auth/confirm', authHandlers.confirmRegistration);

module.exports = router;
