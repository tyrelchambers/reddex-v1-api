***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED***
  Profile.init(
    {
      greeting: DataTypes.STRING,
      recurring: DataTypes.STRING,
      reading_time: DataTypes.INTEGER,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
          onDelete: "CASCADE",
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Profile",
    ***REMOVED***
  ***REMOVED***
  return Profile;
***REMOVED***;
