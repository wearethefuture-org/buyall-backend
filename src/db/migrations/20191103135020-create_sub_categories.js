module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('sub_categories', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        field: 'category_id'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description'
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'img'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    }),
  down: queryInterface => queryInterface.dropTable('sub_categories', {})
};