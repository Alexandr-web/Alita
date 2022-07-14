const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const Cart = sequelize.define("cart", {
  inner: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { tableName: "cart", });

module.exports = Cart;