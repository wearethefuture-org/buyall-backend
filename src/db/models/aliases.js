module.exports = {
  categories: {
    subCategories: 'subCategories'
  },
  subCategories: {
    categories: 'categories',
    characteristicsSettings: 'characteristicsSettings',
    products: 'products'
  },
  products: {
    subCategories: 'subCategories',
    characteristicsValues: 'characteristicsValues'
  },
  characteristicsSettings: {
    subCategories: 'subCategories',
    characteristicsValues: 'characteristicsValues'
  },
  characteristicsValues: {
    products: 'products',
    characteristicsSettings: 'characteristicsSettings'
  },
  users: {
    usersKeys: 'usersKeys',
    usersForgotPasswords: 'usersForgotPasswords',
    orders: 'orders'
  },
  usersKeys: {
    users: 'users'
  },
  usersForgotPasswords: {
    users: 'users'
  },
  orders: {
    user: 'user'
  }
};
