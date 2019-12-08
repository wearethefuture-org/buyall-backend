const Categories = require('../seeders_data/categories');

module.exports = {
  up: (queryInterface) => {
    const categories = Object.values(Categories);

    return queryInterface.bulkInsert('categories', categories, {});
  },

  down: (queryInterface) => {
    const categories = Object.values(Categories);

    return queryInterface.bulkDelete('categories', [{
      name: categories.map(category => {
        return category.name;
      })
    }]);
  }
};
