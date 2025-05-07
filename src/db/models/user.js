"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nickName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nombre: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: false },
      edad: {
        type: new DataTypes.VIRTUAL(DataTypes.NUMBER, ["fechaNacimiento"]),
        get: function () {
          return (
            Math.floor(new Date() - new Date(this.get("fechaNacimiento"))) /
            (1000 * 60 * 60 * 24 * 365)
          )
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
    }
  )
  return User
}
