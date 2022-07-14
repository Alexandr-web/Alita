const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");

Cart.belongsTo(User);
Product.belongsTo(User);

Cart.hasMany(Product);

module.exports = [User, Cart, Product];