"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Contact, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Contacted, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Tag, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Searched, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasOne(models.Website, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.SubmittedStory, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasOne(models.Subscription, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Story, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email must be a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reddit_refresh_token: DataTypes.STRING,
      email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      websiteId: {
        type: DataTypes.UUID,
        references: {
          model: "Websites",
          key: "uuid",
        },
        onDelete: "SET NULL",
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      subscriptionId: {
        type: DataTypes.UUID,
        references: {
          model: "Subscriptions",
          key: "uuid",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
