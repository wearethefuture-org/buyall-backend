const frisby = require('frisby');
const Joi = frisby.Joi;
const faker = require('faker');
const bcrypt = require('bcrypt');
const expect = require('expect');
const model = require('../../src/db/models');
const urlFullPath = require('../../src/utils/urlFullPath');
const setupToken = require('../../src/utils/tests/setupToken');
const statusTextHandler = require('../../src/utils/tests/statusTextHandler');
const { fakeUser, userJsonTypes } = require('../../src/utils/tests/user');
const { categoryJsonTypes } = require('../../src/utils/tests/category');
const { subCategoryJsonTypes } = require('../../src/utils/tests/subCategory');
const { productJsonTypes } = require('../../src/utils/tests/product');

let 
    token,
    user = fakeUser();

describe('e2e user role', () => {
    beforeAll(() => {
        frisby.addExpectHandler('statusText', statusTextHandler);
    });

    afterAll(() => {
        frisby.removeExpectHandler('statusText');
    });

    describe('Auth', () => {
        it('Register', () => {
            return frisby 
                .post(urlFullPath('/auth/register'), user)
                .expect('status', 200)
                .expect('jsonTypes', 'user', userJsonTypes);
        });

        it('Login', () => {
            return frisby 
                .post(urlFullPath('/auth/login'), user)
                .expect('status', 200)
                .expect('jsonTypes', 'user', userJsonTypes)
                .then(({json}) => {
                    token = json.token;
                });
        });

        it('Registration confirmation', async () => {
            let dbUser = await model.users.findOne({where: {email: user.email}});

            const key = await model.usersKeys.findOne({where: {userId: dbUser.id}})

            return frisby 
                .setup(setupToken(token))
                .post(urlFullPath('/auth/confirm'), {key: key.key})
                .expect('status', 200)
                .expect('json', true)
                .then(async () => {
                    dbUser = await model.users.findOne({where: {email: user.email}});
                    expect(dbUser.status).toEqual('confirmed');
                });
        });

        it('Change password', async () => {
            await frisby
                .post(urlFullPath('/auth/sendForgot'), {email: user.email})
                .expect('status', 200)
                .expect('json', true);

            let dbUser = await model.users.findOne({where: {email: user.email}});

            const key = await model.usersForgotPasswords.findOne({where: {userId: dbUser.id}})

            const newPassword = faker.internet.password();

            const body = {email: user.email, key: key.key, password: newPassword};

            return frisby
                .post(urlFullPath('/auth/changePassword'), body)
                .expect('status', 200)
                .expect('json', true)
                .then(async () => {
                    dbUser = await model.users.findOne({where: {email: user.email}});

                    const compare = await bcrypt.compare(newPassword, dbUser.password);

                    expect(compare).toEqual(true);
                })
        });
    });

    describe('Categoreis', () => {
        it('Get all', () => {
            return frisby 
                .get(urlFullPath('/categories'))
                .expect('status', 200)
                .expect('jsonTypes', Joi.array().items(categoryJsonTypes).required());
        });

        it('Get one', () => {
            return frisby 
                .get(urlFullPath('/category/1'))
                .expect('status', 200)
                .expect('jsonTypes', categoryJsonTypes);
        });

        it('Create, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .post(urlFullPath('/category'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Update, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .put(urlFullPath('/category/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Delete, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .delete(urlFullPath('/category/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });
    });

    describe('Sub categoreis', () => {
        it('Get all', () => {
            return frisby 
                .get(urlFullPath('/subCategories'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(subCategoryJsonTypes).required()
                });
        });

        it('Get one', () => {
            return frisby 
                .get(urlFullPath('/subCategory/1'))
                .expect('status', 200)
                .expect('jsonTypes', subCategoryJsonTypes);
        });

        it('Products by sub category', () => {
            return frisby 
                .get(urlFullPath('/subCategoryProducts/1'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(productJsonTypes).required()
                });
        });

        it('Create, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .post(urlFullPath('/subCategory'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Update, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .put(urlFullPath('/subCategory/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Delete, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .delete(urlFullPath('/subCategory/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });
    });

    describe('products', () => {
        it('Get all', async () => {
            const allProducts = await frisby 
                .get(urlFullPath('/products'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(productJsonTypes).required()
                });

            const firstArray = await frisby
                .get(urlFullPath('/products?offset=0&limit=30'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(productJsonTypes).required()
                });

            const secondArray = await frisby
                .get(urlFullPath('/products?offset=30&limit=30'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(productJsonTypes).required()
                });

            const thirdArray = await frisby
                .get(urlFullPath('/products?offset=60&limit=30'))
                .expect('status', 200)
                .expect('jsonTypes', {
                    count: Joi.number().required(),
                    rows: Joi.array().items(productJsonTypes).required()
                });

            expect(JSON.stringify(allProducts.json.rows.slice(0,30)) === JSON.stringify(firstArray.json.rows))
                .toEqual(true);

            expect(JSON.stringify(allProducts.json.rows.slice(30,60)) === JSON.stringify(secondArray.json.rows))
                .toEqual(true);

            expect(JSON.stringify(allProducts.json.rows.slice(60,90)) === JSON.stringify(thirdArray.json.rows))
                .toEqual(true);
        });

        it('Get one', () => {
            return frisby 
                .get(urlFullPath('/product/1'))
                .expect('status', 200)
                .expect('jsonTypes', productJsonTypes);
        });

        it('Create, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .post(urlFullPath('/product'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Update, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .put(urlFullPath('/product/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Delete, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .delete(urlFullPath('/product/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });
    });

    describe('users', () => {
        it('Get all, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .get(urlFullPath('/users'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Get one, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .get(urlFullPath('/user/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Create, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .post(urlFullPath('/user'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Update, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .put(urlFullPath('/user/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });

        it('Delete, expect wrong user role', () => {
            return frisby 
                .setup(setupToken(token))
                .delete(urlFullPath('/user/1'))
                .expect('status', 403)
                .expect('statusText', 'Access denied')
                .expect('bodyContains', 'Only admin and super admins have access to this page!');
        });
    });
});