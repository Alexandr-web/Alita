const sequelize = require("../db");
const { DataTypes, } = require("sequelize");
const Product = sequelize.define("product", {
  title: { type: DataTypes.TEXT, },
  description: { type: DataTypes.TEXT, },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  },
  price: { type: DataTypes.INTEGER, },
  rating: { type: DataTypes.INTEGER, },
  raters: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  category: { type: DataTypes.STRING, },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, { tableName: "product", });

module.exports = Product;