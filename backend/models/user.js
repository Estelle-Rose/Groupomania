'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post)
      models.User.hasMany(models.Comment)
      models.User.hasMany(models.Like)
    }
  };
  User.init({
    pseudo: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    photo: DataTypes.STRING,
    bio: DataTypes.TEXT,
    admin: { type: DataTypes.BOOLEAN, defaultValue: "0" }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};