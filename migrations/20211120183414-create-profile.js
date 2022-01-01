***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      ***REMOVED***,
      greeting: {
        type: Sequelize.STRING,
      ***REMOVED***,
      recurring: {
        type: Sequelize.STRING,
      ***REMOVED***,
      reading_time: {
        type: Sequelize.INTEGER,
      ***REMOVED***,
      reddit_profile: {
        type: Sequelize.JSON,
      ***REMOVED***,
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "uuid",
        ***REMOVED***,
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Profiles"***REMOVED***
  ***REMOVED***,
***REMOVED***;
