const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("antaresdb", "antaresdb", "403201", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
