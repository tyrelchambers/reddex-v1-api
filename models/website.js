"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Website extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Website.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }
  Website.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      config: DataTypes.JSONB,
      hidden: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Website",
    }
  );
  return Website;
};
