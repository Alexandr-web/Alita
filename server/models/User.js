const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const User = sequelize.define("user", {
  name: { type: DataTypes.TEXT, },
  password: { type: DataTypes.TEXT, },
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { tableName: "user", });

module.exports = User;