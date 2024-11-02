const { DataTypes } = require("sequelize");
const sequelize = require("./sql_connector");

const DeviceModel = sequelize.define(
  "devices", // Nama tabel dalam bentuk plural
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    resourceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceIdentifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdTime: {
      type: DataTypes.STRING, // Gunakan STRING untuk menyimpan format waktu yang ada
      allowNull: false,
    },
    lastModifiedTime: {
      type: DataTypes.STRING, // Gunakan STRING untuk menyimpan format waktu yang ada
      allowNull: false,
    },
    oldestData: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latestData: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "devices", // Nama tabel dalam database
    timestamps: true, // Menyimpan createdAt dan updatedAt secara otomatis
  }
);

module.exports = DeviceModel;
