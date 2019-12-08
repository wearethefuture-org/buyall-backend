const Users = require('../seeders_data/users');

module.exports = {
  up: (queryInterface) => {
    const users = Object.values(Users);

    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface) => {
    const users = Object.values(Users);

    return queryInterface.bulkDelete('users', [{
      email: users.map(user => {
        return user.email;
      })
    }]);
  }
};
