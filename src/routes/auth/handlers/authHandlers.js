const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML');
const UsersForgotPasswordsService = require('../../../services/usersForgotPasswords');
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
                ctx.response.status = 403;
                ctx.response.body = {Error: 'Bad password'};
            }
        });
    } else {
        ctx.response.status = 403;
        ctx.response.body = {Error: 'User is unregistered'};
    }
};

const register = async ctx => {
    const renderHTMLService = new RenderHTMLService();
    const userService = new UserService();
    const userKeysService = new UsersKeysService();
    const mailService = new MailService();

    const newUser = ctx.request.body;
    await bcrypt.hash(newUser.password, +process.env.saltRounds)
    .then((hash) => {
        newUser.password = hash;
    });

    let createdUser = null;
    await userService.createUser(newUser)
    .then(user => {
        createdUser = user;
    })
    .catch(err => {
        ctx.response.status = 409;
        ctx.response.body = {Error: 'User already has registered'};
    })

    if (createdUser) {
        const key = await userKeysService.createUserKey(createdUser.id); 

        const html = await renderHTMLService.render('index', {
            name: createdUser.firstName,
            url: `http://localhost:4200/auth/confirm/${key.key}`
        });
        const mail = {
            from: 'buyall@gmail.com',
            to: createdUser.email,
            subject: 'Email confirmation',
            text: 'confirm your email',
            html
        }
        mailService.sendMail(mail)

        const response = {
            Success: true,
            User: createdUser
        };
        ctx.response.body = response;
    }
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

        ctx.response.status = 200;
        ctx.response.body = {Success: true};
    } else {
        ctx.response.status = 409;
        ctx.response.body = {Success: false};
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
            const body = {
                key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            };

            forgotPasswordKey = (await usersForgotPasswordsService.updateForgotPasswordKey(forgotPasswordKey.id, body))[1][0];
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

        ctx.response.status = 200;
        ctx.response.body = {Success: true};
    } else {
        ctx.response.status = 409;
        ctx.response.body = {Error: 'Bad user email'};
    }
};

const forgotPassword = async ctx => {
    ctx.response.body = 'forgot';
};

module.exports = {
    login,
    register,
    confirmRegistration,
    sendForgotPasswordKey,
    forgotPassword
}