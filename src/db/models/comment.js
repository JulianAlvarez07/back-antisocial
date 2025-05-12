"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: "postIdComment",
          allowNull: false,
        },
        as: "post",
      });
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: "userIdComment",
          allowNull: false,
        },
        as: "user",
      });
    }
  }
  Comment.init(
    {
      comentario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      visible: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ["fecha"]),
        get: function () {
          const fecha = new Date(this.get("fecha"));
          const hoy = new Date();
          const seisMesesAtras = new Date(hoy);
          seisMesesAtras.setMonth(hoy.getMonth() - 6);

          return fecha >= seisMesesAtras && fecha <= hoy;
        },
      },
      fechaVisible: {
        type: new DataTypes.VIRTUAL(DataTypes.NUMBER, ["fecha"]),
        get: function () {
          return (
            Math.floor(new Date() - new Date(this.get("fecha"))) /
            (1000 * 60 * 60 * 24 * 365.25)
          );
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      timestamps: false,
    }
  );
  return Comment;
};
