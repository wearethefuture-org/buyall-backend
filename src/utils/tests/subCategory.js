const frisby = require('frisby');

const subCategoryJsonTypes = {
    id: frisby.Joi.number().required(),
    categoryId: frisby.Joi.number().required(),
    name: frisby.Joi.string().required(),
    description: frisby.Joi.string().required(),
    createdAt: frisby.Joi.date().required(),
    updatedAt: frisby.Joi.date().required(),
    characteristicsSettings: frisby.Joi.array().items({
        id: frisby.Joi.number().required(),
        name: frisby.Joi.string().required(),
        type: frisby.Joi.string().required(),
        description: frisby.Joi.string().required(),
        options: frisby.Joi.array().items(frisby.Joi.string()).allow(null).optional(),
        minOption: frisby.Joi.array().items(frisby.Joi.string()).allow(null).optional(),
        maxOption: frisby.Joi.array().items(frisby.Joi.string()).allow(null).optional(),
        createdAt: frisby.Joi.date().required(),
        updatedAt: frisby.Joi.date().required()
    }).optional()
};

module.exports = {
    subCategoryJsonTypes
}