"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      greeting: {
        type: Sequelize.STRING,
      },
      recurring: {
        type: Sequelize.STRING,
      },
      reading_time: {
        type: Sequelize.INTEGER,
      },
      reddit_profile: {
        type: Sequelize.JSON,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "uuid",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  },
};
