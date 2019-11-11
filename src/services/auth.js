const BaseModel = require('./baseModel');

const MailService = require('./mail');
const UserService = require('./user');
const UsersKeysService = require('./usersKeys');
const UsersForgotPasswordsService = require('./usersForgotPasswords');
const RenderHTMLService = require('./renderHTML');
const bcrypt = require('bcrypt');

class AuthService extends BaseModel {
    async login(user) {
        const userService = new UserService();

        const dbUser = (await userService.getUserByEmail(user.email))[0];

        if (dbUser) {
            const compared = await bcrypt.compare(user.password, dbUser.password);

            if (compared) {
                delete dbUser.dataValues.password;
                return dbUser;
            } else {
                throw 'Bad password';
            };
        } else {
            throw 'User is unregistered';
        };
    }

    async register(user) {
        const renderHTMLService = new RenderHTMLService();
        const userService = new UserService();
        const userKeysService = new UsersKeysService();
        const mailService = new MailService();

        user.password = await bcrypt.hash(user.password, +process.env.saltRounds);

        try {
            user = await userService.createUser(user);
        } catch (error) {
            switch (error.message) {
                case 'повторяющееся значение ключа нарушает ограничение уникальности "users_email_key"': {
                    throw 'User has already registered';
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

    async confirmRegistration(key) {
        const userKeysService = new UsersKeysService();
        const userService = new UserService();

        const userKey = (await userKeysService.getUserKey(key))[0];

        if (userKey) {
            userService.updateUser(userKey.userId, {status: 'confirmed'});
            userKeysService.deleteUserKey(userKey.id);

            return true;
        } else {
            return false;
        };
    }

    async sendForgotPasswordKey(email) {
        const renderHTMLService = new RenderHTMLService();
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();
        const mailService = new MailService();

        const user = (await userService.getUserByEmail(email))[0];

        if (user) {
            let forgotPasswordKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

            if (forgotPasswordKey) {
                const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                forgotPasswordKey = (await usersForgotPasswordsService.updateForgotPasswordKey(forgotPasswordKey.id, {key}))[1][0];
            } else {
                forgotPasswordKey = await usersForgotPasswordsService.createForgotPasswordKey(user.id);
            };

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
            };
            mailService.sendMail(mail).then().catch();

            return true;
        } else {
            throw 'Email is unregistered';
        };
    }

    async checkForgotPasswordKey(email, key) {
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();

        const user = (await userService.getUserByEmail(email))[0];
        
        if (user) {
            const trueKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

            if (key === trueKey.key) {
                return true;
            } else {
                return false;
            }
        } else {
            throw 'Email is unregistered';
        };
    }

    async changePassword(email, key, password) {
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();
        const user = (await userService.getUserByEmail(email))[0];

        if (user) {
            const trueKey = (await usersForgotPasswordsService.getForgotPasswordKey(user.id))[0];

            if (key === trueKey.key) {
                const hash = await bcrypt.hash(password, +process.env.saltRounds);
                userService.updateUser(user.id, { password: hash });

                return true;
            } else {
                return false;
            };
        } else {
            throw 'Email is unregistered';
        }
    }
}

module.exports = AuthService;