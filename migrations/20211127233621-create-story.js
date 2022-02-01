"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Stories", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flair: {
        type: Sequelize.STRING,
      },
      num_comments: {
        type: Sequelize.INTEGER,
      },
      post_id: {
        type: Sequelize.STRING,
      },
      self_text: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      ups: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      subreddit: {
        type: Sequelize.STRING,
      },
      permission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
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
    await queryInterface.dropTable("Stories");
  },
};
