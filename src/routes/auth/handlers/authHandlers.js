const MailService = require('../../../services/mail');
const UserService = require('../../../services/user');

const login = async ctx => {
    const mailService = new MailService();
    var email = {
        from: 'buyall@gmail.com',
        to: '7734.why.not@gmail.com',
        subject: 'Test 2',
        text: 'Text2 ',
        html: '<b>Test 2</b>'
    };
    mailService.sendMail(email)
    ctx.response.body = 'login';
};

const register = async ctx => {
    const userService = new UserService();
    const newUser = ctx.request.body;
    ctx.response.body = await userService.createUser(newUser);
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