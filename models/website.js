***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Website extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ***REMOVED***
  ***REMOVED***
  Website.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      ***REMOVED***,
  ***REMOVED***: DataTypes.JSONB,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Website",
    ***REMOVED***
  ***REMOVED***
  return Website;
***REMOVED***;
