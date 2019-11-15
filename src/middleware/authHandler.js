const passport = require('../services/passport');
let { AuthExceptions } = require('../enums/Urls');
AuthExceptions = Object.values(AuthExceptions);

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (AuthExceptions.includes(ctx.request.url)) {
            await next();
            return;
        } 

        if (err) {
            ctx.response.status = 500;
            ctx.response.body = err;
            return;
        } 

        if (!user) {
            ctx.response.status = 401;
            ctx.response.body = 'Unauthorized!';
            return;
        } 

        ctx.user = user;
        await next();
    })(ctx, next);
};

module.exports = authMiddleware;
