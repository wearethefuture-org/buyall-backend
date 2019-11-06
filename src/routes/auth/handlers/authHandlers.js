const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML');
const bcrypt = require('bcrypt');

const login = async ctx => {
    const userService = new UserService();

    const { email, password } = ctx.request.body;
    const user = (await userService.getUserByEmail(email))[0];

    if (user) {
        await bcrypt.compare(password, user.password)
        .then((result) => {
            if (result) {
                ctx.response.body = user;
            } else {
                ctx.response.status = 403;
                ctx.response.body = {Error: 'Bad username or password'};
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
        ctx.response.body = {Error: 'User already has registered.'};
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
    const { key }= ctx.request.body;
    const userKeysService = new UsersKeysService();
    const userService = new UserService();
    
    const userKey = (await userKeysService.getUserKey(key))[0];
    await userService.updateUser(userKey.userId, {
        status: 'confirmed'
    });

    ctx.response.body = await userKeysService.deleteUserKey(userKey.id);
};

const forgotPassword = async ctx => {
    ctx.response.body = 'forgot';
};

module.exports = {
    login,
    register,
    confirmRegistration,
    forgotPassword
}