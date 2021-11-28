'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Profiles", "reading_time", "words_per_minute")
  ***REMOVED***,

  down: async (queryInterface, Sequelize) => {
        return queryInterface.renameColumn("Profiles", "words_per_minute", "reading_time")

  ***REMOVED***
***REMOVED***;
