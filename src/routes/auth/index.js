const Router = require('@koa/router');
const authHandlers = require('./handlers/authHandlers.js');
const AuthUrls = require('../../enums/AuthUrls');

const router = new Router();

// login
router.post(AuthUrls.login, authHandlers.login);

// register 
router.post(AuthUrls.register, authHandlers.register);

// send forgot password key on mail 
router.post(AuthUrls.sendForgot, authHandlers.sendForgotPasswordKey);

// check forgot password key 
router.post(AuthUrls.checkKey, authHandlers.checkForgotPasswordKey);

// change password 
router.post(AuthUrls.changePassword, authHandlers.changePassword);

// confirm registration
router.post(AuthUrls.confirm, authHandlers.confirmRegistration);

module.exports = router;