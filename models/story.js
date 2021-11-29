***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ***REMOVED***
  ***REMOVED***
  Story.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      ***REMOVED***,
      flair: {
        type: DataTypes.STRING,
      ***REMOVED***,
      num_comments: {
        type: DataTypes.INTEGER,
      ***REMOVED***,
      post_id: {
        type: DataTypes.STRING,
      ***REMOVED***,
      self_text: {
        type: DataTypes.TEXT,
      ***REMOVED***,
      title: {
        type: DataTypes.STRING,
      ***REMOVED***,
      ups: {
        type: DataTypes.INTEGER,
      ***REMOVED***,
      url: {
        type: DataTypes.STRING,
      ***REMOVED***,
      subreddit: {
        type: DataTypes.STRING,
      ***REMOVED***,
      permission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      ***REMOVED***,
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      ***REMOVED***,
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Story",
    ***REMOVED***
  ***REMOVED***
  return Story;
***REMOVED***;