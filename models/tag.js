"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Story, {
        foreignKey: "tagId",
        as: "stories",
        through: "StoryTag",
      });
    }
  }
  Tag.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      tag: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
          onDelete: "CASCADE",
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
