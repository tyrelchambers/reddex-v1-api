***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "subscriptionId", {
      type: Sequelize.UUID,
      references: {
        model: "Subscriptions",
        key: "uuid",
      ***REMOVED***,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "subscriptionId"***REMOVED***
  ***REMOVED***,
***REMOVED***;
