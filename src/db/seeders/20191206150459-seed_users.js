const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const faker = require('faker');
const model = require('../models');

const users = [
  {
      firstName: 'superadmin',
      lastName: 'superadmin',
      email: 'superadmin@gmail.com',
      password: '111111',
      status: 'confirmed',
      role: 'superadmin',
      disabled: false,
      img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
      dateBirthday: new Date('January 31 1996 00:00'),
  },
  {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: '111111',
      status: 'confirmed',
      role: 'admin',
      disabled: false,
      img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
      dateBirthday: new Date('January 31 1996 00:00'),
  },
  {
      firstName: 'user',
      lastName: 'user',
      email: 'user@gmail.com',
      password: '111111',
      status: 'confirmed',
      role: 'user',
      disabled: false,
      img: 'https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png',
      dateBirthday: new Date('January 31 1996 00:00'),
  }
];

module.exports = {
  up: async () => {
    await Promise.each(users, async user => {
      user.password = await bcrypt.hash(user.password, +process.env.saltRounds);

      try {
        await model.users.create(user);
      } catch (error) {
        console.log(error.message);
      }
    });

    const amount = 100;
    const statuses = ['invited', 'pending', 'confirmed'];
    const roles = ['user', 'admin', 'superadmin'];

    for (let i = 0;i < amount;i++) {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: statuses[faker.random.number(2)],
        role: roles[faker.random.number(2)],
        disabled: faker.random.boolean(),
        img: faker.image.avatar(),
        dateBirthday: faker.date.past()
      };

      try {
        await model.users.create(user);
      } catch (error) {
        console.log(error.message);
      }
    }
  },

  down: async () => {
    return await model.users.truncate({
      restartIdentity: true,
      cascade: true
    });
  }
};
