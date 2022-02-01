"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Stories", "viewed", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("Stories", "upvote_ratio", {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Stories", "viewed"),
      queryInterface.removeColumn("Stories", "upvote_ratio"),
    ]);
  },
};
