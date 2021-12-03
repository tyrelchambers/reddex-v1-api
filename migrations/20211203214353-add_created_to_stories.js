***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Stories", "created", {
      type: Sequelize.INTEGER,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Stories", "created"***REMOVED***
  ***REMOVED***,
***REMOVED***;
