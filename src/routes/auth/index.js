const Router = require('@koa/router');
const authHandlers = require('./handlers/authHandlers.js');
const authMiddleware = require('../../middleware/authHandler');

const router = new Router();

// login
router.post('/auth/login', authHandlers.login);

// register 
router.post('/auth/register', authHandlers.register);

// send forgot password key on mail 
// delete middleware
router.post('/auth/sendForgot', authHandlers.sendForgotPasswordKey);

// check forgot password key 
router.post('/auth/checkKey', authHandlers.checkForgotPasswordKey);

// change password 
router.post('/auth/changePassword', authHandlers.changePassword);

// confirm registration
router.post('/auth/confirm', authMiddleware, authHandlers.confirmRegistration);

module.exports = router;