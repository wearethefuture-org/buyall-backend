const faker = require('faker');
const frisby = require('frisby');

const model = require('../../db/models');

const statuses = model.users.rawAttributes.status.values;
const roles = model.users.rawAttributes.role.values;

const fakeUser = () => {
    return {
        firstName: faker.name.firstName(), 
        lastName: faker.name.lastName(), 
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: statuses[faker.random.number(statuses.length - 1)],
        role: roles[faker.random.number(roles.length - 1)],
        disabled: faker.random.boolean(),
        dateBirthday: faker.date.past()
    };
};

const userJsonTypes = {
    id: frisby.Joi.number().required(),
    firstName: frisby.Joi.string().required(),
    lastName: frisby.Joi.string().required(),
    email: frisby.Joi.string().required(),
    status: frisby.Joi.string().valid(...statuses).required(),
    role: frisby.Joi.string().valid(...roles).required(),
    disabled: frisby.Joi.boolean().required(),
    dateBirthday: frisby.Joi.date().required(),
    createdAt: frisby.Joi.date().required(),
    updatedAt: frisby.Joi.date().required()
};

module.exports = {
    fakeUser,
    userJsonTypes
}