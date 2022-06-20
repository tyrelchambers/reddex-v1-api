"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubmittedStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubmittedStory.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      email: DataTypes.STRING,
      author: DataTypes.STRING,
      story_title: DataTypes.STRING,
      sent_to_others: DataTypes.BOOLEAN,
      body: DataTypes.TEXT,
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
      modelName: "SubmittedStory",
    }
  );
  return SubmittedStory;
};
