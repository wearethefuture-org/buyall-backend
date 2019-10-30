const { Sequelize, Model, DataTypes } = require("sequelize");
const { hash, compare } = require("bcryptjs");

const sequelize = new Sequelize("sqlite::memory:");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "users",
    instanceMethods: {
      comparePassword(password) {
        return compare(password, this.password);
      }
    }
  }
);

User.beforeCreate(user => {
  return hash(user.password, 10).then(hashedPassword => {
    user.password = hashedPassword;
  });
});

module.exports = User;
