const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const Cart = sequelize.define("cart", {
  inner: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
}, { tableName: "cart", });

module.exports = Cart;