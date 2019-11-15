const HttpError = require('../utils/httpError');
let { UserRoleExceptions } = require('../enums/Urls');
UserRoleExceptions = Object.values(UserRoleExceptions);

const roleMiddleware = async (ctx, next) => {
    for (let i = 0;i < UserRoleExceptions.length;i++) {
        if (Object.values(UserRoleExceptions[i]).includes(ctx.request.url)) {
            await next();
            return;
        }
    }

    if (ctx.user.role === 'admin' || ctx.user.role === 'moderator') {
        await next();
        return;
    } 

    throw new HttpError(401, 'Only moderators and admins have access to this page!', 'Access denied')
};

module.exports = roleMiddleware;
