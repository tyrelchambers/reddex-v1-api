***REMOVED***
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Stories", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      ***REMOVED***,
      flair: {
        type: Sequelize.STRING,
      ***REMOVED***,
      num_comments: {
        type: Sequelize.INTEGER,
      ***REMOVED***,
      post_id: {
        type: Sequelize.STRING,
      ***REMOVED***,
      self_text: {
        type: Sequelize.TEXT,
      ***REMOVED***,
      title: {
        type: Sequelize.STRING,
      ***REMOVED***,
      ups: {
        type: Sequelize.INTEGER,
      ***REMOVED***,
      url: {
        type: Sequelize.STRING,
      ***REMOVED***,
      subreddit: {
        type: Sequelize.STRING,
      ***REMOVED***,
      permission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      ***REMOVED***,
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      ***REMOVED***,
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "uuid",
        ***REMOVED***,
        onDelete: "CASCADE",
      ***REMOVED***,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      ***REMOVED***,
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      ***REMOVED***,
    ***REMOVED******REMOVED***
  ***REMOVED***,
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Stories"***REMOVED***
  ***REMOVED***,
***REMOVED***;
