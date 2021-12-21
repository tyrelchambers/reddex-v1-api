***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Subscriptions", "cancelOn", {
      type: Sequelize.INTEGER,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Subscriptions", "cancelOn"***REMOVED***
  ***REMOVED***,
***REMOVED***;
