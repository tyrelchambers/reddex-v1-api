"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Websites", "hidden", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Websites", "hidden");
  },
};
