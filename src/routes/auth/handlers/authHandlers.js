const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML');
const UsersForgotPasswordsService = require('../../../services/usersForgotPasswords');
const AuthService = require('../../../services/auth');
const bcrypt = require('bcrypt');

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
        ctx.response.body = error;
    };
};

const register = async ctx => {
    const authService = new AuthService();
    const user = ctx.request.body;

    try {
        ctx.response.body = await authService.register(user);
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error;
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
        ctx.response.body = error;
    };
};

const checkForgotPasswordKey = async ctx => {
    const usersForgotPasswordsService = new UsersForgotPasswordsService();
    const userService = new UserService();

    const { email, key } = ctx.request.body;

    const user = (await userService.getUserByEmail(email))[0];
    const trueKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

    if (user) {
        if (key === trueKey.key) {
            ctx.response.body = true;
        } else {
            ctx.response.body = false;
        }
    } else {
        ctx.response.status = 500;
        ctx.response.body = 'Bad user email';
    }
};

const changePassword = async ctx => {
    const usersForgotPasswordsService = new UsersForgotPasswordsService();
    const userService = new UserService();

    const { email, key, password } = ctx.request.body;

    const user = (await userService.getUserByEmail(email))[0];
    const trueKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

    if (user) {
        if (key === trueKey.key) {
            bcrypt.hash(password, +process.env.saltRounds)
                .then((hash) => {
                    userService.updateUser(user.id, { password: hash });
                });

            ctx.response.body = true;
        } else {
            ctx.response.body = false;
        }
    } else {
        ctx.response.status = 500;
        ctx.response.body = 'Bad user email';
    }
};

module.exports = {
    login,
    register,
    confirmRegistration,
    sendForgotPasswordKey,
    checkForgotPasswordKey,
    changePassword
}