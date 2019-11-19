const HttpError = require('../utils/httpError');
let { UserRoleUrls} = require('../enums/Urls');
UserRoleUrls = Object.values(UserRoleUrls);

const roleMiddleware = async (ctx, next) => {
    let guardRoute = false;

    // check if route is guarded
    for (let i = 0;i < UserRoleUrls.length;i++) {
        if (Object.values(UserRoleUrls[i]).includes(ctx.request.url)) {
            guardRoute = true;
        }
    }

    if (!guardRoute) {
        await next();
        return;
    }

    if (ctx.user.role === 'admin' || ctx.user.role === 'superadmin') {
        await next();
        return;
    } 

    throw new HttpError(403, 'Only admin and super admins have access to this page!', 'Access denied')
};

module.exports = roleMiddleware;
