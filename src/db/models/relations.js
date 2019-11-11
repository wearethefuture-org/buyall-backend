module.exports = db => {
  db.subCategories.belongsTo(db.categories, {
   as: db.aliases.subCategories.categories,
    field: 'category_id',
    targetKey: 'id',
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
  });
  db.categories.hasMany(db.subCategories, {
   as: db.aliases.categories.subCategories,
    field: 'category_id',
    targetKey: 'id',
    foreignKey: 'categoryId',
  });

  db.usersKeys.belongsTo(db.users, {
   as: db.aliases.usersKeys.users,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  db.users.hasMany(db.usersKeys, {
   as: db.aliases.users.usersKeys,
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
  db.users.hasMany(db.usersForgotPasswords, {
   as: db.aliases.users.usersForgotPasswords,
    field: 'user_id',
    targetKey: 'id',
    foreignKey: 'userId',
  });
};
