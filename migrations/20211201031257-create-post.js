***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,

      posts: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      ***REMOVED***,
      subreddit: {
        type: Sequelize.STRING,
      ***REMOVED***,
      owner: {
        type: Sequelize.STRING,
      ***REMOVED***,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      ***REMOVED***,
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      ***REMOVED***,
    ***REMOVED******REMOVED***
  ***REMOVED***,
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts"***REMOVED***
  ***REMOVED***,
***REMOVED***;
