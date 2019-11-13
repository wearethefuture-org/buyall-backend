const bcrypt = require('bcrypt');

const BaseModel = require('./baseModel');
const MailService = require('./mail');
const TokenService = require('./token');
const UserService = require('./user');
const UsersKeysService = require('./usersKeys');
const UsersForgotPasswordsService = require('./usersForgotPasswords');
const RenderHTMLService = require('./renderHTML');
const generateRandomString = require('../utils/generateRandomString');

class AuthService extends BaseModel {
    async login(user) {
        const userService = new UserService();
        const tokenService = new TokenService();

        const dbUser = await userService.getUserByEmail(user.email);

        if (!dbUser) {
            throw new Error('User is unregistered');
        };

        const compared = await bcrypt.compare(user.password, dbUser.password);

        if (compared) {
            delete dbUser.dataValues.password;
            const token = await tokenService.generateToken({user: dbUser.dataValues}, +process.env.TOKEN_TIME);

            return {
                user: dbUser,
                token
            };
        };

        throw new Error('Bad password');
    }

    async register(user) {
        const renderHTMLService = new RenderHTMLService();
        const userService = new UserService();
        const userKeysService = new UsersKeysService();
        const mailService = new MailService();

        user.password = await bcrypt.hash(user.password, +process.env.saltRounds);

        if (await userService.getUserByEmail(user.email)) {
            throw new Error('User has already registered');
        };

        const createdUser = await userService.createUser(user);

        const key = await userKeysService.createUserKey(createdUser.id);

        const html = await renderHTMLService.render('confirmEmail', {
            name: createdUser.firstName,
            url: `${process.env.FRONT_URL}:${process.env.FRONT_PORT}/auth/confirm/${key.key}`
        });
        const mail = {
            from: 'buyall@gmail.com',
            to: createdUser.email,
            subject: 'Email confirmation',
            text: 'confirm your email',
            html
        };
        mailService.sendMail(mail).then().catch();

        delete createdUser.dataValues.password;
        return createdUser;
    }

    async confirmRegistration(key) {
        const userKeysService = new UsersKeysService();
        const userService = new UserService();

        const userKey = await userKeysService.getUserKey(key);

        if (userKey) {
            userService.updateUser(userKey.userId, {status: 'confirmed'});
            userKeysService.deleteUserKey(userKey.id);

            return true;
        };
        return false;
    }

    async sendForgotPasswordKey(email) {
        const renderHTMLService = new RenderHTMLService();
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();
        const mailService = new MailService();

        const user = await userService.getUserByEmail(email);

        if (user) {
            let forgotPasswordKey = await usersForgotPasswordsService.getForgotPasswordKey(user.id);

            if (forgotPasswordKey) {
                const key = generateRandomString();

                forgotPasswordKey.update({key});
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
        };
        throw new Error('Email is unregistered');
    }

    async checkForgotPasswordKey(email, key) {
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();

        const user = await userService.getUserByEmail(email);

        if (!user) {
            throw new Error('Email is unregistered');
        };

        const trueKey = await usersForgotPasswordsService.getForgotPasswordKey(user.id);

        if (key === trueKey.key) {
            return true;
        };
        return false;
    }

    async changePassword(email, key, password) {
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();
        const user = await userService.getUserByEmail(email);

        if (!user) {
            throw new Error('Email is unregistered');
        };

        const trueKey = await usersForgotPasswordsService.getForgotPasswordKey(user.id);

        if (key === trueKey.key) {
            const hash = await bcrypt.hash(password, +process.env.saltRounds);
            userService.updateUser(user.id, { password: hash });

            return true;
        };
        return false;
    }
}

module.exports = AuthService;