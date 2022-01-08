***REMOVED***
const { Model ***REMOVED*** = require("sequelize"***REMOVED***
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      ***REMOVED******REMOVED***
    ***REMOVED***
  ***REMOVED***
  Subscription.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      ***REMOVED***,
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
      ***REMOVED***,
      plan: {
        type: DataTypes.STRING,
      ***REMOVED***,
      term: DataTypes.STRING,

      subscriptionId: {
        type: DataTypes.STRING,
      ***REMOVED***,
      cancelOn: DataTypes.INTEGER,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "uuid",
        ***REMOVED***,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      ***REMOVED***,
    ***REMOVED***,
    {
***REMOVED***
      modelName: "Subscription",
    ***REMOVED***
  ***REMOVED***
  return Subscription;
***REMOVED***;
