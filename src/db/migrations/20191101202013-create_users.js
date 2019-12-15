module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('users', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      status: {
        type: DataTypes.ENUM('invited', 'pending', 'confirmed'),
        allowNull: false,
        defaultValue: 'pending',
        field: 'status'
      },
      role: {
        type: DataTypes.ENUM('user', 'admin', 'superadmin'),
        allowNull: false,
        defaultValue: 'user',
        field: 'role'
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'disabled'
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'img'
      },
      dateBirthday: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'birthday_date'
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
  down: queryInterface => queryInterface.dropTable('users', {})
};
