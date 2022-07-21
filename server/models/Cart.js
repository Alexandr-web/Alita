const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { tableName: "cart", });

module.exports = Cart;