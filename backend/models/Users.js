/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      pseudo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'pseudo',
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'email',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      admin: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Users',
    }
  );
};
