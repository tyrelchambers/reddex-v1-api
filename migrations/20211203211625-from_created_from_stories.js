***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Stories", "created"***REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Stories", "created", Sequelize.DATE***REMOVED***
  ***REMOVED***,
***REMOVED***;
