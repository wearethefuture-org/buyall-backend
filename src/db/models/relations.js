module.exports = db => {
  // db.users.belongsTo(db.usersRoles, {
  //  as: db.aliases.user.role,
  //   field: 'role_id',
  //   foreignKey: 'roleId'
  // });

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
};
