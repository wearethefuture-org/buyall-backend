const AuthUrls = require('./AuthUrls');
const CategoryUrls = require('./CategoryUrls');

delete AuthUrls.confirm;

const PassportUrlExceptions = Object.assign(AuthUrls, CategoryUrls);

module.exports = PassportUrlExceptions;