const Router = require('@koa/router');
const authHandlers = require('./handlers/authHandlers.js');

const router = new Router();

// login
router.post('/auth/login', authHandlers.login);

// register 
router.post('/auth/register', authHandlers.register);

// forgot password
router.post('/auth/forgot', authHandlers.forgotPassword);

// confirm registration
router.post('/auth/confirm', authHandlers.confirmRegistration);

module.exports = router;