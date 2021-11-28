***REMOVED***

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Profiles", "greeting", {
        type: Sequelize.TEXT,
      ***REMOVED***),

      queryInterface.changeColumn("Profiles", "recurring", {
        type: Sequelize.TEXT,
      ***REMOVED***),
    ]***REMOVED***
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Profiles", "greeting", {
        type: Sequelize.STRING,
      ***REMOVED***),

      queryInterface.changeColumn("Profiles", "recurring", {
        type: Sequelize.STRING,
      ***REMOVED***),
    ]***REMOVED***
  ***REMOVED***,
***REMOVED***;
