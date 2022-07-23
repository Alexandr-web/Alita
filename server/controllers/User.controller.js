const UserModel = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const CartProduct = require("../models/CartProduct");
const bcrypt = require("bcrypt");

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
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения данной операции нужно быть авторизованным", });
      }

      const { id, } = req.params;
      const user = await UserModel.findOne({ where: { id, }, });

      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", });
      }

      if (parseInt(id) !== req.userId) {
        return res.status(403).json({ ok: false, message: "Нельзя получить корзину у чужого аккаунта", });
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
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения данной операции нужно быть авторизованным", });
      }

      const { id, } = req.params;
      const user = await UserModel.findOne({ where: { id, }, });

      if (!user) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", });
      }

      if (parseInt(id) !== req.userId) {
        return res.status(403).json({ ok: false, message: "Нельзя получить товары у чужого аккаунта", });
      }

      const products = await Product.findAll({ where: { userId: parseInt(id), }, });

      return res.status(200).json({ ok: true, products, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async edit(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для ", });
      }

      const { id, } = req.params;
      const candidate = await UserModel.findOne({ where: { id, }, });

      if (!candidate) {
        return res.status(404).json({ ok: false, message: "Произошла ошибка сервера", });
      }

      if (parseInt(id) !== req.userId) {
        return res.status(403).json({ ok: false, message: "Нельзя изменить данные чужого аккаунта", });
      }

      const { password, } = req.body;
      const userData = req.body;

      if (password) {
        userData.password = await bcrypt.hash(password, 7);
      }

      await candidate.update(userData);

      return res.status(200).json({ ok: true, message: "Данные пользователя изменены", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }
}

module.exports = new User();