const AuthUrls = require('./AuthUrls');
const UserUrls = require('./UserUrls');
const CategoryUrls = require('./CategoryUrls');
const SubCategoryUrls = require('./SubCategoryUrls');


const AuthExceptions = Object.assign({}, AuthUrls, CategoryUrls);
delete AuthExceptions.confirm;

const UserRoleExceptions = {
    auth: AuthUrls,
    category: CategoryUrls,
    subCategory: SubCategoryUrls
};

module.exports = {
    AuthUrls,
    UserUrls,
    CategoryUrls,
    SubCategoryUrls,
    UserRoleExceptions,
    AuthExceptions
};