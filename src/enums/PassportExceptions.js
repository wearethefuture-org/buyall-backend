const AuthUrls = require('./AuthUrls');
const CategoryUrls = require('./CategoryUrls');

let AuthExceptions = Object.assign({}, AuthUrls); 
delete AuthExceptions.confirm;

const PassportUrlExceptions = Object.assign(AuthExceptions, CategoryUrls);

module.exports = PassportUrlExceptions;