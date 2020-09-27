/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    comment: {
      type: "LONGTEXT",
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'id'
      },
      unique: "fk_Comments_Posts"
    },
    com_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Posts_Users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'User_id'
      },
      unique: "fk_Comment_post_user"
    }
  }, {
    sequelize,
    tableName: 'Comments'
  });
};
