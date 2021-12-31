***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Subscriptions", "trialEnds"),
      queryInterface.removeColumn("Subscriptions", "card"),
    ]***REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Subscriptions", "trialEnds", {
        type: Sequelize.DATE,
      ***REMOVED***),
      queryInterface.addColumn("Subscriptions", "card", {
        type: Sequelize.JSONB,
      ***REMOVED***),
    ]***REMOVED***
  ***REMOVED***,
***REMOVED***;
