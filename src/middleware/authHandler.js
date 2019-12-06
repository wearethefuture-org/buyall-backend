const passport = require('../services/passport');
const HttpError = require('../utils/httpError');
let { PassportUrls } = require('../enums/Urls');
PassportUrls = Object.values(PassportUrls);

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        PassportUrls = {} // no routes now refactor this
        let guardRoute = false;

        // check if route is guarded
        for (let i = 0;i < PassportUrls.length;i++) {
            if (PassportUrls[i].includes(ctx.request.url)) {
                guardRoute = true;
            }
        }
        
        if (!guardRoute) {
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
