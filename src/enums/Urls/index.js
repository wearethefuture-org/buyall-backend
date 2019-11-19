const AuthUrls = require('./AuthUrls');
const UserUrls = require('./UserUrls');
const CategoryUrls = require('./CategoryUrls');
const SubCategoryUrls = require('./SubCategoryUrls');


const PassportAuth = Object.assign({}, AuthUrls);
delete PassportAuth.confirm;

const PassportUrls = {
    PassportAuth,
    UserUrls
};

const UserRoleUrls = {
    UserUrls
};

module.exports = {
    AuthUrls,
    UserUrls,
    CategoryUrls,
    SubCategoryUrls,
    UserRoleUrls,
    PassportUrls
};