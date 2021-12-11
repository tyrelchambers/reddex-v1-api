***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Websites", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
  ***REMOVED***: {
        type: Sequelize.JSON,
      ***REMOVED***,
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
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
    await queryInterface.dropTable("Websites"***REMOVED***
  ***REMOVED***,
***REMOVED***;
