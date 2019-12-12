const Promise = require('bluebird');
const faker = require('faker');
const model = require('../models');

module.exports = {
  up: async () => {
    const categories = await model.categories.findAll({raw: true});

    await Promise.each(categories, async category => {
      const amount = 3;

      for (let i = 0;i < amount;i++) {
        const subCategory = {
          name: faker.lorem.words(2),
          categoryId: category.id,
          description: faker.lorem.sentence(10),
          img: faker.image.image()
        };

        try {
          await model.subCategories.create(subCategory)
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  },

  down: async () => {
    return await model.subCategories.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
