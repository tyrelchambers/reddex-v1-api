***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
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
      ***REMOVED******REMOVED***

      User.hasMany(models.Contact, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      ***REMOVED******REMOVED***

      User.hasMany(models.Contacted, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      ***REMOVED******REMOVED***

      User.hasMany(models.Tag, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED***
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        ***REMOVED***,
      ***REMOVED***,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      ***REMOVED***,
      reddit_refresh_token: DataTypes.STRING,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "User",
    ***REMOVED***
  ***REMOVED***
  return User;
***REMOVED***;
