/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Session', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id'
      },
      unique: "fk_Session_Users1"
    }
  }, {
    sequelize,
    tableName: 'Session'
  });
};
