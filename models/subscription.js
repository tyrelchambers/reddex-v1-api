"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Subscription.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plan: {
        type: DataTypes.STRING,
      },
      term: DataTypes.STRING,

      subscriptionId: {
        type: DataTypes.STRING,
      },
      cancelOn: DataTypes.INTEGER,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    }
  );
  return Subscription;
};
