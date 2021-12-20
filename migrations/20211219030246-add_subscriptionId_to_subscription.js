***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Subscriptions", "subscriptionId", {
      type: Sequelize.STRING,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Subscriptions", "subscriptionId"***REMOVED***
  ***REMOVED***,
***REMOVED***;
