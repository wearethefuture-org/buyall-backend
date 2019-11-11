const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML');
const UsersForgotPasswordsService = require('../../../services/usersForgotPasswords');
const AuthService = require('../../../services/auth');
const bcrypt = require('bcrypt');

const login = async ctx => {
    const userService = new UserService();

    const { email, password } = ctx.request.body;
    const user = (await userService.getUserByEmail(email))[0];

    if (user) {
        await bcrypt.compare(password, user.password)
        .then((result) => {
            if (result) {
                delete user.dataValues.password;
                ctx.response.body = user;
            } else {
                ctx.response.status = 500;
                ctx.response.body = 'Bad password';
            }
        });
    } else {
        ctx.response.status = 500;
        ctx.response.body = 'User is unregistered';
    }
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
    const userKeysService = new UsersKeysService();
    const userService = new UserService();
    const { key } = ctx.request.body;
    
    const userKey = (await userKeysService.getUserKey(key))[0];

    if (userKey) {
        await userService.updateUser(userKey.userId, {
            status: 'confirmed'
        });
        await userKeysService.deleteUserKey(userKey.id);

        ctx.response.body = true;
    } else {
        ctx.response.status = 500;
        ctx.response.body = false;
    }
};

const sendForgotPasswordKey = async ctx => {
    const renderHTMLService = new RenderHTMLService();
    const usersForgotPasswordsService = new UsersForgotPasswordsService();
    const userService = new UserService();
    const mailService = new MailService();

    const { email } = ctx.request.body;
    const user = (await userService.getUserByEmail(email))[0];

    if (user) {
        let forgotPasswordKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

        if (forgotPasswordKey) {
            const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            forgotPasswordKey = (await usersForgotPasswordsService.updateForgotPasswordKey(forgotPasswordKey.id, {key}))[1][0];
        } else {
            forgotPasswordKey = await usersForgotPasswordsService.createForgotPasswordKey(user.id);
        }

        const html = await renderHTMLService.render('passwordKey', {
            name: user.firstName,
            email: user.email,
            key: forgotPasswordKey.key
        });
        const mail = {
            from: 'buyall@gmail.com',
            to: user.email,
            subject: 'Forgot password',
            text: 'forgot password key',
            html
        }
        mailService.sendMail(mail)

        ctx.response.body = true;
    } else {
        ctx.response.status = 500;
        ctx.response.body = 'Bad user email';
    }
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