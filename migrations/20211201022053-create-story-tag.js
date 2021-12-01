***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StoryTags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      ***REMOVED***,
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: "Stories",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      ***REMOVED***,
      tagId: {
        type: Sequelize.UUID,
        references: {
          model: "Tags",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("StoryTags"***REMOVED***
  ***REMOVED***,
***REMOVED***;
