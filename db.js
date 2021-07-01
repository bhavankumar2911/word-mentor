const { Sequelize } = require("sequelize");

// Option 2: Passing parameters separately (sqlite)
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'word-mentor.sqlite'
});

module.exports = db;
