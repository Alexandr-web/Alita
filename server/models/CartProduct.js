const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const CartProduct = sequelize.define("cartProduct", {
  title: { type: DataTypes.TEXT, },
  description: { type: DataTypes.TEXT, },
  quantity: { type: DataTypes.INTEGER, },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
  price: { type: DataTypes.INTEGER, },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  category: { type: DataTypes.STRING, },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { tableName: "cartProduct", });

module.exports = CartProduct;