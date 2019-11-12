const AuthService = require('../../../services/auth');

const login = async ctx => {
    const authService = new AuthService();

    const user = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    };

    try {
        ctx.response.body = await authService.login(user);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
    };
};

const register = async ctx => {
    const authService = new AuthService();
    const user = ctx.request.body;

    try {
        ctx.response.body = await authService.register(user);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
    };
};

const confirmRegistration = async ctx => {
    const authService = new AuthService();
    const { key } = ctx.request.body;

    ctx.response.body = await authService.confirmRegistration(key);
};

const sendForgotPasswordKey = async ctx => {
    const authService = new AuthService();
    const { email } = ctx.request.body;

    try {
        ctx.response.body = await authService.sendForgotPasswordKey(email);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
    };
};

const checkForgotPasswordKey = async ctx => {
    const authService = new AuthService();
    const { email, key } = ctx.request.body;

    try {
        ctx.response.body = await authService.checkForgotPasswordKey(email, key);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
    };
};

const changePassword = async ctx => {
    const authService = new AuthService();
    const { email, key, password } = ctx.request.body;

    try {
        ctx.response.body = await authService.changePassword(email, key, password);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
    };
};

module.exports = {
    login,
    register,
    confirmRegistration,
    sendForgotPasswordKey,
    checkForgotPasswordKey,
    changePassword
};