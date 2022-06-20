"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subscriptions", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plan: {
        type: Sequelize.STRING,
      },
      trialEnds: {
        type: Sequelize.DATE,
      },
      term: Sequelize.STRING,
      card: {
        type: Sequelize.JSONB,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "uuid",
        },
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("Subscriptions");
  },
};
