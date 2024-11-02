const { DataTypes } = require("sequelize");
const sequelize = require("./sql_connector");

const SettingsModel = sequelize.define(
  "settings",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "settings",
    timeStamp: true,
  }
);

module.exports = SettingsModel;
