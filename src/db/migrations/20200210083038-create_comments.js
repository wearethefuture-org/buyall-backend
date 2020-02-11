module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('comments', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      message:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'message'
      },
      userId:{
        type: DataTypes.BIGINT,
        references:{
          model: 'users',
          key: 'id'
        },
        field: 'userId'
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
  down: queryInterface => queryInterface.dropTable('comments', {})
};
