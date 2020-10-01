/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Likes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
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
      unique: "fk_like_post_id"
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
      unique: "fk_like_user_id"
    }
  }, {
    sequelize,
    tableName: 'Likes'
  });
};
