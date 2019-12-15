const Promise = require('bluebird');
const faker = require('faker');
const model = require('../models');

module.exports = {
  up: async () => {
    const products = await model.products.findAll({raw: true});

    await Promise.each(products, async product => {
      const settings = await model.subCategories.findOne({
        where: {id: product.subCategoryId},
        include: [{
          model: model.characteristicsSettings,
          as: model.aliases.subCategories.characteristicsSettings
        }]
      }).then((res) => {return res.toJSON().characteristicsSettings;});

      await Promise.each(settings, async setting => {
        const value = {
          productId: product.id,
          characteristicSettingId: setting.id,
          name: setting.name,
          type: setting.type
        };

        switch (setting.type) {
          case 'string': 
            value.stringValue = faker.lorem.word();
            break;
          case 'boolean':
            value.booleanValue = faker.random.boolean();
            break;
          case 'integer':
            value.integerValue = faker.random.number();
            break;
          case 'float':
            value.floatValue = faker.random.number({precision: 0.001});
            break;
          case 'date':
            value.dateValue = faker.date.past();
            break;
          case 'enum':
            value.enumValue = setting.options[faker.random.number(setting.options.length - 1)];
            break;
        }
        
        await model.characteristicsValues.create(value);
      });
    });
  },

  down: async () => {
    return await model.characteristicsValues.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
