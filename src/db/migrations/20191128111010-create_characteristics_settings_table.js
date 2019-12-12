module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('characteristics_settings', {
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description'
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        field: 'options'
      },
      minOption: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'minOption'
      },
      maxOption: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'maxOption'
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
  down: queryInterface => queryInterface.dropTable('characteristics_settings', {})
};