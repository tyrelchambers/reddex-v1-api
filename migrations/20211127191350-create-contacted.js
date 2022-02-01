"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Contacteds", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Contacteds");
  },
};
