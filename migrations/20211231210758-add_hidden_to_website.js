***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Websites", "hidden", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Websites", "hidden"***REMOVED***
  ***REMOVED***,
***REMOVED***;
