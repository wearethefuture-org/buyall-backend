const passport = require('../services/passport');
const HttpError = require('../utils/httpError');
let { AuthExceptions } = require('../enums/Urls');
AuthExceptions = Object.values(AuthExceptions);

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (AuthExceptions.includes(ctx.request.url)) {
            await next();
            return;
        } 

        if (err) {
            throw err;
        } 

        if (!user) {
            throw new HttpError(401, 'Unauthorized!' ,'Access denied');
        } 

        ctx.user = user;
        await next();
    })(ctx, next);
};

module.exports = authMiddleware;
