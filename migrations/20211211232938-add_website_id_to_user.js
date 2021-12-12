***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "websiteId", {
      type: Sequelize.UUID,
      references: {
        model: "Websites",
        key: "uuid",
      ***REMOVED***,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "websiteId"***REMOVED***
  ***REMOVED***,
***REMOVED***;
