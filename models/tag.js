***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ***REMOVED***
  ***REMOVED***
  Tag.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      tag: {
        type: DataTypes.STRING,
      ***REMOVED***,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
          onDelete: "CASCADE",
        ***REMOVED***,
      ***REMOVED***,
      storyId: {
        type: DataTypes.UUID,
        references: {
          model: "Stories",
          key: "uuid",
          onDelete: "CASCADE",
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Tag",
    ***REMOVED***
  ***REMOVED***
  return Tag;
***REMOVED***;
