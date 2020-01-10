const passport = require('../services/passport');
const { match } = require("path-to-regexp");
const HttpError = require('../utils/httpError');
const { PassportUrls } = require('../enums/Urls');

const authMiddleware = async (ctx, next) => {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err) {
            throw err;
        }

        const { url, method } = ctx.request;

        let routeGuared = false;

        PassportUrls.forEach(route => {
            if (method !== route.method) {
                return;
            }

            const regexp = match(route.url, {decode: decodeURIComponent});

            if (!regexp(url)) {
                return;
            }

            routeGuared = true;
        });

        if (!routeGuared) {
            await next();
            return;
        }

        if (!user) {
            throw new HttpError(401, 'Unauthorized!' ,'Access denied');
        } 

        ctx.user = user;
        await next();
    })(ctx, next);
};

module.exports = authMiddleware;
