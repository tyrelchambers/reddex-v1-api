"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Searched extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Searched.init(
    {
      subreddit: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Searched",
    }
  );
  return Searched;
};
