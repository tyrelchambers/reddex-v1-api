***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Stories", "used"***REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Stories", "used", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    ***REMOVED******REMOVED***
  ***REMOVED***,
***REMOVED***;
