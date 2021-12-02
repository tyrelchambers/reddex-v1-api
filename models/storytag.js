***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class StoryTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ***REMOVED***
  ***REMOVED***
  StoryTag.init(
    {
      storyId: {
        type: DataTypes.UUID,
        references: {
          model: "Stories",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      ***REMOVED***,
      tagId: {
        type: DataTypes.UUID,
        references: {
          model: "Tags",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "StoryTag",
    ***REMOVED***
  ***REMOVED***
  return StoryTag;
***REMOVED***;
