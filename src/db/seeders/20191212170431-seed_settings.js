const Promise = require('bluebird');
const faker = require('faker');
const model = require('../models');

module.exports = {
  up: async () => {
    const subCategories = await model.subCategories.findAll({raw: true});

    const types = ['string', 'boolean', 'integer', 'float', 'date', 'enum'];

    await Promise.each(subCategories, async subCategory => {
      const amount = 3;

      for (let i = 0;i < amount;i++) {
        let setting = {
          name: faker.lorem.word(),
          type: types[faker.random.number(5)],
          description: faker.lorem.sentence(10)
        };

        if (setting.type === 'enum') {
          const options = [];

          const amountOfTypes = 3;

          for (let i = 0;i < amountOfTypes;i++) {
            options.push(faker.lorem.word());
          }

          setting.options = options;
        }

        try {
          setting = await model.characteristicsSettings.create(setting)
            .then((res) => {return res.get()});

          await model.subCategoryCharacteristics.create({
            subCategoryId: subCategory.id,
            characteristicsSettingsId: setting.id
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  },

  down: async () => {
    await model.subCategoryCharacteristics.truncate({
      restartIdentity: true,
      cascade: true
    });

    await model.characteristicsSettings.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
