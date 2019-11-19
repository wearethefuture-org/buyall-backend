const AuthService = require('../../../services/auth');

const login = async ctx => {
    const authService = new AuthService();

    const user = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    };

    ctx.response.body = await authService.login(user);
};

const register = async ctx => {
    const authService = new AuthService();
    const user = ctx.request.body;

    ctx.response.body = await authService.register(user);
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