const Promise = require('bluebird');
const model = require('../models');
const SubCategories = require('../seeders_data/subCategories');
const Products = require('../seeders_data/products');

module.exports = {
  up: async (queryInterface) => {
    const categoriesWithSubCategories = Object.values(SubCategories);

    await Promise.each(categoriesWithSubCategories, async subCategoriesOfCategory => {
      await Promise.each(Object.values(subCategoriesOfCategory), async subCategory => {
        const dbSubCategory = await model.subCategories.findOne({
          where: {
            name: subCategory.name
          }
        });

        if (!dbSubCategory) {
          return;
        }

        await Promise.each(subCategory.products, async product => {
          product.subCategoryId = dbSubCategory.id;
          const dbProduct = await model.products.create(product);

          await Promise.each(product.values, async value => {
            const setting = await model.characteristicsSettings.findOne({
              where: {
                name: value.setting.name
              },
              through: {
                model: model.subCategoryCharacteristics,
                where: {
                  subCategoryId: dbSubCategory.id
                }
              },
              raw: true
            });

            if (!setting) {
              return;
            }

            value.productId = dbProduct.id;
            value.characteristicSettingId = setting.id;

            await model.characteristicsValues.create(value);
          });
        });
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    const products = Object.values(Products);
    
    await Promise.each(products, async product => {
      const dbProduct = await model.products.findOne({
        where: {
          name: product.name
        },
        include: [
          {
            model: model.characteristicsValues,
            as: model.aliases.products.characteristicsValues
          }
        ]
      });

      await Promise.each(dbProduct.characteristicsValues, async value => {
        await value.destroy();
      });

      await dbProduct.destroy();
    });
  }
};
