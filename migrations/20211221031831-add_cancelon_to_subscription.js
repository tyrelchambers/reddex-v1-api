"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Subscriptions", "cancelOn", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Subscriptions", "cancelOn");
  },
};
