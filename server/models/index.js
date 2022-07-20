const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");

Cart.belongsTo(User);
Product.belongsTo(User);

module.exports = [User, Cart, Product];