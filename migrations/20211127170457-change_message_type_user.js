"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Profiles", "greeting", {
        type: Sequelize.TEXT,
      }),

      queryInterface.changeColumn("Profiles", "recurring", {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Profiles", "greeting", {
        type: Sequelize.STRING,
      }),

      queryInterface.changeColumn("Profiles", "recurring", {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
