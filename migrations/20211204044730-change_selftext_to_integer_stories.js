"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Stories", "self_text", {
      type: 'INTEGER USING CAST("self_text" as INTEGER)',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Stories", "self_text", {
      type: 'TEXT USING CAST("self_text" as TEXT)',
    });
  },
};
