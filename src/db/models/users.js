module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'users',
    {
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
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'disabled'
      },
      createdDatetime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_datetime'
      }
    },
    {}
  );
  // eslint-disable-next-line
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
