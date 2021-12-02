***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Stories", "reading_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Stories", "reading_time"***REMOVED***
  ***REMOVED***,
***REMOVED***;
