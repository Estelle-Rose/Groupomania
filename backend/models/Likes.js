/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Likes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Posts_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'id'
      },
      unique: "fk_Likes_Posts"
    },
    Posts_Users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'User_id'
      },
      unique: "fk_Likes_post_user"
    },
    Comments_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'Comments',
        },
        key: 'id'
      },
      unique: "fk_Likes_comments"
    }
  }, {
    sequelize,
    tableName: 'Likes'
  });
};
