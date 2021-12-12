***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SubmittedStories", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      email: {
        type: Sequelize.STRING,
      ***REMOVED***,
      author: {
        type: Sequelize.STRING,
      ***REMOVED***,
      story_title: {
        type: Sequelize.STRING,
      ***REMOVED***,
      sent_to_others: {
        type: Sequelize.BOOLEAN,
      ***REMOVED***,
      body: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("SubmittedStories"***REMOVED***
  ***REMOVED***,
***REMOVED***;
