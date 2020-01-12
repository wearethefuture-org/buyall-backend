const AuthService = require('../../../services/auth');

const login = async ctx => {
    const authService = new AuthService();

    const { body } = ctx.request;

    ctx.response.body = await authService.login(body);
};

const register = async ctx => {
    const authService = new AuthService();

    const { body } = ctx.request;

    ctx.response.body = await authService.register(body);
};

const confirmRegistration = async ctx => {
    const authService = new AuthService();

    const { key } = ctx.request.body;

    ctx.response.body = await authService.confirmRegistration(key);
};

const sendForgotPasswordKey = async ctx => {
    const authService = new AuthService();

    const { email } = ctx.request.body;

    ctx.response.body = await authService.sendForgotPasswordKey(email);
};

const checkForgotPasswordKey = async ctx => {
    const authService = new AuthService();

    const { email, key } = ctx.request.body;

    ctx.response.body = await authService.checkForgotPasswordKey(email, key);
};

const changePassword = async ctx => {
    const authService = new AuthService();

    const { email, key, password } = ctx.request.body;

    ctx.response.body = await authService.changePassword(email, key, password);
};

module.exports = {
    login,
    register,
    confirmRegistration,
    sendForgotPasswordKey,
    checkForgotPasswordKey,
    changePassword
};