/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    post_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'id'
      },
      unique: "fk_comment_post_id"
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'user_id'
      },
      unique: "fk_comment_user_id"
    }
  }, {
    sequelize,
    tableName: 'Comments'
  });
};
