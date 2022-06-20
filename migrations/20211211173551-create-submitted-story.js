"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SubmittedStories", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      story_title: {
        type: Sequelize.STRING,
      },
      sent_to_others: {
        type: Sequelize.BOOLEAN,
      },
      body: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("SubmittedStories");
  },
};
