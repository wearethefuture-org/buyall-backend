const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const config = require('../utils/config');
const HttpError = require('../utils/httpError');
const BaseModel = require('./baseModel');
const MailService = require('./mail');
const UserService = require('./user');
const OrderService = require('./orders');

const UsersKeysService = require('./usersKeys');
const UsersForgotPasswordsService = require('./usersForgotPasswords');
const RenderHTMLService = require('./renderHTML');
const { generateRandomString, generateToken } = require('../utils/keys');

class AuthService extends BaseModel {
    async login(body) {
        const userService = new UserService();

        const user = await userService.getUserByEmail(body.email);

        if (!user) {
            throw new HttpError(401, 'User is unregistered', 'Access denied');
        };

        const compared = await bcrypt.compare(body.password, user.password);

        if (!compared) {
            throw new HttpError(401, 'Bad password', 'Access denied');
        }

        const token = generateToken(user.toJSON());

        return { user, token };
    }

    async register(body) {
        const orderService = new OrderService();
        const renderHTMLService = new RenderHTMLService();
        const userService = new UserService();
        const userKeysService = new UsersKeysService();
        const mailService = new MailService();

        body.password = await bcrypt.hash(body.password, config.saltRounds);

        if (await userService.getUserByEmail(body.email)) {
            throw new HttpError(409, 'User has already registered', 'Can\'t register');
        };

        body.status = 'pending';
        body.role = 'user';
        body.disabled = false;

        const user = await userService.createUser(body);

        user.dataValues.orders = [];

        await Promise.each(body.orders || [], async order => {
            const body = {
                amount: order.amount,
                productId: order.product.id,
                userId: user.id,
                status: 'in cart'
            };

            const dbOrder = await orderService.createOrder(body);

            user.dataValues.orders.push(dbOrder);
        });

        const key = await userKeysService.createUserKey(user.id);

        const html = await renderHTMLService.render('confirmEmail', {
            name: user.firstName,
            url: `${config.frontPort}:${config.frontPort}/auth/confirm/${key.key}`
        });
        const mail = {
            from: 'buyall@gmail.com',
            to: user.email,
            subject: 'Email confirmation',
            text: 'confirm your email',
            html
        };
        mailService.sendMail(mail);

        const token = generateToken(user.toJSON());

        return { user, token };
    }

    async confirmRegistration(key) {
        const userKeysService = new UsersKeysService();
        const userService = new UserService();

        const userKey = await userKeysService.getUserKey(key);

        if (!userKey) {
            return false;
        }

        await userService.updateUser(userKey.userId, {status: 'confirmed'});
        userKeysService.deleteUserKey(userKey.id);

        return true;
    }

    async sendForgotPasswordKey(email) {
        const renderHTMLService = new RenderHTMLService();
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();
        const mailService = new MailService();

        const user = await userService.getUserByEmail(email);

        if (!user) {
            throw new HttpError(409, 'Email is unregistered', 'Can\'t send key');
        }

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
        mailService.sendMail(mail);

        return true;
    }

    async checkForgotPasswordKey(email, key) {
        const usersForgotPasswordsService = new UsersForgotPasswordsService();
        const userService = new UserService();

        const user = await userService.getUserByEmail(email);

        if (!user) {
            throw new HttpError(409, 'Email is unregistered', 'Can\'t check key');
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
            throw new HttpError(409, 'Email is unregistered', 'Can\'t change password');
        };

        const trueKey = await usersForgotPasswordsService.getForgotPasswordKey(user.id);

        if (key !== trueKey.key) {
            return false;
        };

        usersForgotPasswordsService.deleteForgotPasswordKey(trueKey.id);

        const hash = await bcrypt.hash(password, config.saltRounds);
        await userService.updateUser(user.id, { password: hash });

        return true;
    }
}

module.exports = AuthService;
