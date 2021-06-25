const { Sequelize } = require("sequelize");
const { DB, DB_USER, DB_PWD, DB_HOST, DB_DIALECT, DB_PORT } = process.env;

const db = new Sequelize(DB, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: false,
});

module.exports = db;
