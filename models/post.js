***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ***REMOVED***
  ***REMOVED***
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      owner: {
        type: DataTypes.STRING,
      ***REMOVED***,
      posts: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      ***REMOVED***,
      subreddit: {
        type: DataTypes.STRING,
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Post",
    ***REMOVED***
  ***REMOVED***
  return Post;
***REMOVED***;
