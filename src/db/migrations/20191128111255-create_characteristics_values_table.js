module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('characteristics_values', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      productId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        field: 'product_id'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type'
      },
      stringValue: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'string_value'
      },
      booleanValue: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'boolean_value'
      },
      intValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'integer_value'
      },
      floatValue: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'float_value'
      },
      dateValue: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'date_value'
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
  down: queryInterface => queryInterface.dropTable('characteristics_values', {})
};