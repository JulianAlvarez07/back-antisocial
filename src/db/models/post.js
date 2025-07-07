"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },

        as: "user",
      });
      Post.hasMany(models.Post_Images, {
        foreignKey: {
          name: "postId",
          allowNull: false,
        },
        as: "post_images",
      });
      Post.hasMany(models.Comment, {
        foreignKey: {
          name: "postIdComment",
          allowNull: false,
        },
        as: "comment",
      });

      Post.belongsToMany(models.Tag, {
        through: "PostTags",
        foreignKey: "postId",
        timestamp: false,
        as: "tags",
      });
    }
  }
  Post.init(
    {
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      contenido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false,
    }
  );
  return Post;
};
