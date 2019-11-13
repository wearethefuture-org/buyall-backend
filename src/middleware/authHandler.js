const passport = require('../services/passport');

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err) {
            ctx.response.status = 500;
            ctx.response.body = err;
        } else {
            if (!user) {
                ctx.response.status = 401;
                ctx.response.body = 'Unauthorized!';
            } else {
                ctx.user = user;
                await next();
            };
        };
    })(ctx, next);
};

module.exports = authMiddleware;
