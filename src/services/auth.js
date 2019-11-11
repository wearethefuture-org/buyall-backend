const BaseModel = require('./baseModel');

const MailService = require('./mail');
const UserService = require('./user');
const UsersKeysService = require('./usersKeys');
const RenderHTMLService = require('./renderHTML');
const bcrypt = require('bcrypt');

class AuthService extends BaseModel {
    async register(user) {
        const renderHTMLService = new RenderHTMLService();
        const userService = new UserService();
        const userKeysService = new UsersKeysService();
        const mailService = new MailService();

        try {
            user.password = await bcrypt.hash(user.password, +process.env.saltRounds);
        } catch (error) {
            throw 'Invalid credits';
        };

        try {
            user = await userService.createUser(user);
        } catch (error) {
            switch (error.message) {
                case 'повторяющееся значение ключа нарушает ограничение уникальности "users_email_key"': {
                    throw 'User already registered';
                }
                default: {
                    throw 'Invalid credits';
                }
            }
        };

        const key = await userKeysService.createUserKey(user.id); 

        const html = await renderHTMLService.render('confirmEmail', {
            name: user.firstName,
            url: `${process.env.FRONT_URL}:${process.env.FRONT_PORT}/auth/confirm/${key.key}`
        });
        const mail = {
            from: 'buyall@gmail.com',
            to: user.email,
            subject: 'Email confirmation',
            text: 'confirm your email',
            html
        };
        mailService.sendMail(mail).then().catch();

        delete user.dataValues.password;
        return user;
    }
}

module.exports = AuthService;