/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Categories'
  });
};
