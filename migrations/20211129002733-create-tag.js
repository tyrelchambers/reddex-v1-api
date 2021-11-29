***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tags", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      tag: {
        type: Sequelize.STRING,
      ***REMOVED***,
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "uuid",
          onDelete: "CASCADE",
        ***REMOVED***,
      ***REMOVED***,
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: "Stories",
          key: "uuid",
          onDelete: "CASCADE",
        ***REMOVED***,
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
    await queryInterface.dropTable("Tags"***REMOVED***
  ***REMOVED***,
***REMOVED***;
