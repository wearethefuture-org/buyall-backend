const MailService = require('../../../services/mail');

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
    ctx.response.body = 'register';
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