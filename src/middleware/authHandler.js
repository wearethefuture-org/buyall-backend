const passport = require('../services/passport');
const HttpError = require('../utils/httpError');
const { PassportUrls } = require('../enums/Urls');

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        let notGuardRoute = false;

        // TODO refactor this code
        for (let i = 0; i < PassportUrls.length; i++) {
            if (!PassportUrls[i].includes(ctx.request.url)) {
                notGuardRoute = true;
            }
        }
        
        if (notGuardRoute) {
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
