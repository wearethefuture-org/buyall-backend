const frisby = require('frisby');

const { subCategoryJsonTypes } = require('./subCategory');

const categoryJsonTypes = {
    id: frisby.Joi.number().required(),
    name: frisby.Joi.string().required(),
    description: frisby.Joi.string().required(),
    createdAt: frisby.Joi.date().required(),
    updatedAt: frisby.Joi.date().required(),
    subCategories: frisby.Joi.array().items(subCategoryJsonTypes).optional()
};

module.exports = {
    categoryJsonTypes
}
