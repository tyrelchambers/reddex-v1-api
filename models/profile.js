"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  Profile.init(
    {
      greeting: DataTypes.STRING,
      recurring: DataTypes.STRING,
      words_per_minute: DataTypes.INTEGER,
      reddit_profile: DataTypes.JSON,
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
      modelName: "Profile",
    }
  );
  return Profile;
};
