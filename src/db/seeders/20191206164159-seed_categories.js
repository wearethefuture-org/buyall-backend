const faker = require('faker');
const model = require('../models');

module.exports = {
  up: async () => {
    const amount = 10;

    for (let i = 0;i < amount;i++) {
      const category = {
        name: faker.lorem.words(2),
        description: faker.lorem.sentence(10),
        img: faker.image.image()
      };

      try {
        await model.categories.create(category);
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  down: async () => {
    return await model.categories.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
