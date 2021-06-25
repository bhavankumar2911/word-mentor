const db = require("./db");
const { DataTypes } = require("sequelize");
const { INTEGER, STRING, TEXT } = DataTypes;

const model = db.define(
  "Word",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    word: {
      type: STRING,
      allowNull: false,
    },
    meaning: {
      type: TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = model;
