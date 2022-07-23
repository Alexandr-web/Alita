const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");
const CartProduct = require("./CartProduct");

Cart.belongsTo(User);
Product.belongsTo(User);
CartProduct.belongsTo(Cart);
CartProduct.belongsTo(Product);
CartProduct.belongsTo(User);

module.exports = [User, Cart, Product, CartProduct];