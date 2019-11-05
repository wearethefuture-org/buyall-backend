const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML');

const login = async ctx => {
    ctx.response.body = 'login';
};

const register = async ctx => {
    const renderHTMLService = new RenderHTMLService();
    const userService = new UserService();
    const userKeysService = new UsersKeysService();
    const mailService = new MailService();

    const newUser = ctx.request.body;
    const createdUser = await userService.createUser(newUser);
    const key = await userKeysService.createUserKey(createdUser.id); 

    const html = await renderHTMLService.render('index', {
        name: createdUser.first_name,
        url: `http://localhost:3004/auth/confirm/${key.key}`
    });

    const mail = {
        from: 'buyall@gmail.com',
        to: createdUser.email,
        subject: 'Email confirmation',
        text: 'confirm your email',
        html
    }
    mailService.sendMail(mail)

    ctx.response.body = createdUser;
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