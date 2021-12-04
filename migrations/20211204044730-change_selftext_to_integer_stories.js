***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Stories", "self_text", {
      type: 'INTEGER USING CAST("self_text" as INTEGER)',
    ***REMOVED******REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Stories", "self_text", {
      type: 'TEXT USING CAST("self_text" as TEXT)',
    ***REMOVED******REMOVED***
  ***REMOVED***,
***REMOVED***;
