"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "subscriptionId", {
      type: Sequelize.UUID,
      references: {
        model: "Subscriptions",
        key: "uuid",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "subscriptionId");
  },
};
