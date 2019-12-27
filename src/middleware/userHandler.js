const { match } = require("path-to-regexp");
const HttpError = require('../utils/httpError');
const { UserRoleUrls } = require('../enums/Urls');

const roleMiddleware = async (ctx, next) => {
    const { user } = ctx;
    const { url, method } = ctx.request;

    let routeGuared = false;

    UserRoleUrls.forEach(route => {
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

    if (user.role === 'admin' || user.role === 'superadmin') {
        await next();
        return;
    } 

    throw new HttpError(403, 'Only admin and super admins have access to this page!', 'Access denied')
};

module.exports = roleMiddleware;
