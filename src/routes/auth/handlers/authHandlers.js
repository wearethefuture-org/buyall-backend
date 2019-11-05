const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');
const UsersKeysService = require('../../../services/usersKeys');
const RenderHTMLService = require('../../../services/renderHTML')

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
        to: '7734.why.not@gmail.com',
        to: createdUser.email,
        subject: 'Email confirmation',
        text: 'confirm your email',
        html
    }
    mailService.sendMail(mail)

    ctx.response.body = createdUser;
};

const confirmRegistration = async ctx => {
    ctx.response.body = 'confirm';
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