module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('files', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'url'
      },
      oneProductId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id'
        },
        field: 'one_product_id'
      },
      manyProductId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id'
        },
        field: 'many_product_id'
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
  down: queryInterface => queryInterface.dropTable('files', {})
};