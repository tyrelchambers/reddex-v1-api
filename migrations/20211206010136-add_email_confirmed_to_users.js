***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "email_confirmed", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "email_confirmed"***REMOVED***
  ***REMOVED***,
***REMOVED***;
