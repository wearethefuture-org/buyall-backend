const Promise = require('bluebird');
const faker = require('faker');
const model = require('../models');

module.exports = {
  up: async () => {
    const subCategories = await model.subCategories.findAll({raw: true});

    await Promise.each(subCategories, async subCategory => {
      const amount = 3;

      for (let i = 0;i < amount;i++) {
        const product = {
          subCategoryId: subCategory.id,
          name: faker.lorem.words(2),
          description: faker.lorem.sentence(10),
          img: faker.image.image(),
          available: faker.random.boolean(),
          isPromotion: faker.random.boolean(),
          weight: faker.random.number(),
          price: faker.random.number()
        };

        if (product.available) product.amount = faker.random.number();
        if (product.isPromotion) product.discount = faker.random.number({max: 100, precision: 0.1});

        try {
          await model.products.create(product);
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  },

  down: async () => {
    return await model.products.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
