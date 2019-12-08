const Promise = require('bluebird');
const model = require('../models');
const Categories = require('../seeders_data/categories');
const SubCategories = require('../seeders_data/subCategories');
const CharacteristicsSettings = require('../seeders_data/characteristicsSettings');

module.exports = {
  up: async (queryInterface) => {
    const categories = Object.values(Categories);
    
    const subCategories = [];

    await Promise.each(categories, async category => {
      const dbCategory = await model.categories.findOne({
        where: {name: category.name},
        raw: true
      });

      if (!dbCategory) {
        return;
      }

      if (!SubCategories[dbCategory.name]) {
        return;
      }
      
      const subCategoriesOfCategory = Object.values(SubCategories[dbCategory.name]);

      subCategories.push.apply(subCategories, subCategoriesOfCategory.map(subCategory => {
        subCategory.categoryId = dbCategory.id;
        return subCategory;
      }));
    });

    return await Promise.mapSeries(subCategories, async subCategory => {
      const dbSubCategory = await model.subCategories.create(subCategory);

      if (!subCategory.settings || !dbSubCategory) {
        return subCategory;
      }

      await Promise.each(subCategory.settings, async setting => {
        let dbSetting = await model.characteristicsSettings.findOne({where: {name: setting.name}});
        
        if (!dbSetting) {
          dbSetting = await model.characteristicsSettings.create(setting);
        }

        const subCategoryCharacteristic = {};
        subCategoryCharacteristic.subCategoryId = dbSubCategory.id;
        subCategoryCharacteristic.characteristicsSettingsId = dbSetting.id;

        await model.subCategoryCharacteristics.create(subCategoryCharacteristic);
      });

      return subCategory;
    });
  },

  down: async (queryInterface) => {
    const subCategories = Object.values(SubCategories);
    const characteristicsSettings = Object.values(CharacteristicsSettings);

    await Promise.each(characteristicsSettings, async setting => {
      const dbSettings = await model.characteristicsSettings.findAll({
        where: {
          name: setting.name
        }
      });

      if (!dbSettings) {
        return;
      }

      await Promise.each(dbSettings, async dbSetting => {
        await model.subCategoryCharacteristics.destroy({
          where: {
            characteristicsSettingsId: dbSetting.id
          }
        });

        await model.characteristicsSettings.destroy({
          where: {
            id: dbSetting.id
          }
        });
      });
    });

    return await Promise.each(subCategories, async subCategoriesOfCategory => {
      await Promise.each(Object.values(subCategoriesOfCategory), async subCategory => {
        const dbSubCategory = await model.subCategories.findOne({
          where: {
            name: subCategory.name
          }
        });

        if (!dbSubCategory) {
          return;
        }

        await model.subCategoryCharacteristics.destroy({
          where: {
            subCategoryId: dbSubCategory.id
          }
        });

        await model.subCategories.destroy({
          where: {
            id: dbSubCategory.id
          }
        });
      });
    });
  }
};
