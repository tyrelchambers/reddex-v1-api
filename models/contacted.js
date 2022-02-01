"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacted.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contacted",
    }
  );
  return Contacted;
};
