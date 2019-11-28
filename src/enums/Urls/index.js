const AuthUrls = require('./AuthUrls');
const UserUrls = require('./UserUrls');
const CategoryUrls = require('./CategoryUrls');
const SubCategoryUrls = require('./SubCategoryUrls');
const ProductsUrls = require('./ProductsUrls');


const PassportAuth = {};
PassportAuth.confirm = AuthUrls.confirm;

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
    ProductsUrls,
    UserRoleUrls,
    PassportUrls
};