const frisby = require('frisby');

const { subCategoryJsonTypes } = require('./subCategory');

const productJsonTypes = {
    id: frisby.Joi.number().required(),
    subCategoryId: frisby.Joi.number().required(),
    name: frisby.Joi.string().required(),
    description: frisby.Joi.string().required(),
    available: frisby.Joi.boolean().required(),
    isPromotion: frisby.Joi.boolean().required(),
    amount: frisby.Joi.number().allow(null).optional(),
    discount: frisby.Joi.number().allow(null).optional(),
    weight: frisby.Joi.number().required(),
    price: frisby.Joi.number().required(),
    createdAt: frisby.Joi.date().required(),
    updatedAt: frisby.Joi.date().required(),
    characteristicsValues: frisby.Joi.array().items({
        id: frisby.Joi.number().required(),
        productId: frisby.Joi.number().required(),
        name: frisby.Joi.string().required(),
        type: frisby.Joi.string().required(),
        stringValue: frisby.Joi.string().allow(null).optional(),
        booleanValue: frisby.Joi.boolean().allow(null).optional(),
        integerValue: frisby.Joi.number().allow(null).optional(),
        floatValue: frisby.Joi.number().allow(null).optional(),
        dateValue: frisby.Joi.date().allow(null).optional(),
        enumValue: frisby.Joi.string().allow(null).optional()
    }).optional()
};

module.exports = {
    productJsonTypes
}
