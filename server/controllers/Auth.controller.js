const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Auth {
  async registration(req, res) {
    try {
      const { email, password, } = req.body;
      const candidate = await User.findOne({ where: { email, }, });

      if (candidate) {
        return res.status(400).json({ ok: false, message: "Такой пользователь уже существует", });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const userData = { ...req.body, password: hashPassword, };

      await User.create(userData);

      return res.status(200).json({ ok: true, message: "Пользователь зарегистрирован", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async login(req, res) {
    try {
      const { email, password, } = req.body;
      const candidate = await User.findOne({ where: { email, }, });

      if (!candidate) {
        return res.status(404).json({ ok: false, message: "Такого пользователя не существует", });
      }

      const passwordIsMatch = await bcrypt.compare(password, candidate.password);

      if (!passwordIsMatch) {
        return res.status(400).json({ ok: false, message: "Неверный пароль", });
      }

      const token = jwt.sign(candidate.dataValues, process.env.SECRET_KEY, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60), });

      await Cart.create({ userId: candidate.id, });

      return res.status(200).json({ ok: true, message: "Пользователь вошел", token: `Bearer ${token}`, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }
}

module.exports = new Auth();