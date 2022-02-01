"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Subscriptions", "trialEnds"),
      queryInterface.removeColumn("Subscriptions", "card"),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Subscriptions", "trialEnds", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Subscriptions", "card", {
        type: Sequelize.JSONB,
      }),
    ]);
  },
};
