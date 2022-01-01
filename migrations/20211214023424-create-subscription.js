***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subscriptions", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      customerId: {
        type: Sequelize.STRING,
        allowNull: false,
      ***REMOVED***,
      plan: {
        type: Sequelize.STRING,
      ***REMOVED***,
      trialEnds: {
        type: Sequelize.DATE,
      ***REMOVED***,
      term: Sequelize.STRING,
      card: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable("Subscriptions"***REMOVED***
  ***REMOVED***,
***REMOVED***;
