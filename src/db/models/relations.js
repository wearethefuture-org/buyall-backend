module.exports = db => {
  db.categories.hasMany(db.subCategories, {
    as: db.aliases.categories.subCategories,
    field: 'category_id',
    targetKey: 'id',
    foreignKey: 'categoryId',
  });
  db.subCategories.belongsTo(db.categories, {
    as: db.aliases.subCategories.categories,
    field: 'category_id',
    targetKey: 'id',
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
  });

  db.subCategories.hasMany(db.products, {
    as: db.aliases.subCategories.products,
    field: 'sub_category_id',
    targetKey: 'id',
    foreignKey: 'subCategoryId',
  });
  db.products.belongsTo(db.subCategories, {
    as: db.aliases.products.subCategories,
    field: 'sub_category_id',
    targetKey: 'id',
    foreignKey: 'subCategoryId',
    onDelete: 'CASCADE'
  });

  db.products.hasMany(db.characteristicsValues, {
    as: db.aliases.products.characteristicsValues,
    field: 'product_id',
    targetKey: 'id',
    foreignKey: 'productId',
  });
  db.characteristicsValues.belongsTo(db.products, {
    as: db.aliases.characteristicsValues.products,
    field: 'product_id',
    targetKey: 'id',
    foreignKey: 'productId',
    onDelete: 'CASCADE'
  });

  db.users.hasMany(db.usersKeys, {
    as: db.aliases.users.usersKeys,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
  });
  db.usersKeys.belongsTo(db.users, {
    as: db.aliases.usersKeys.users,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

  db.users.hasMany(db.usersForgotPasswords, {
    as: db.aliases.users.usersForgotPasswords,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
  });
  db.usersForgotPasswords.belongsTo(db.users, {
    as: db.aliases.usersForgotPasswords.users,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
};
