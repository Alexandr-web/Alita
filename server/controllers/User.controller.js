const UserModel = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const CartProduct = require("../models/CartProduct");

class User {
  async getOne(req, res) {
    try {
      const { id, } = req.params;
      const user = await UserModel.findOne({ where: { id, }, });

      return res.status(200).json({ ok: true, user, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async getCartProducts(req, res) {
    try {
      const { id, } = req.params;
      const user = await UserModel.findOne({ where: { id, }, });

      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", });
      }

      const cart = await Cart.findOne({ where: { userId: id, }, });
      const allCartProducts = await CartProduct.findAll();
      const products = allCartProducts.filter(({ dataValues: { cartId, }, }) => cartId === cart.dataValues.id);

      return res.status(200).json({ ok: true, products, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async getProducts(req, res) {
    try {
      const { id, } = req.params;
      const user = await UserModel.findOne({ where: { id, }, });

      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", });
      }

      const products = await Product.findAll({ where: { userId: parseInt(id), }, });

      return res.status(200).json({ ok: true, products, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }
}

module.exports = new User();