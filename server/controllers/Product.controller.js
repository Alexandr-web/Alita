const ProductModel = require("../models/Product");
const Cart = require("../models/Cart");
const CartProduct = require("../models/CartProduct");
const removeFile = require("../removeFile");

class Product {
  async getOne(req, res) {
    try {
      const { id, } = req.params;
      const product = await ProductModel.findOne({ where: { id, }, });

      return res.status(200).json({ ok: true, product, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async getAll(req, res) {
    try {
      const { category, search, } = req.query;
      const allProducts = await ProductModel.findAll();
      let filterProducts = [...allProducts];

      const filterByCategory = ({ category: ctgr, }) => ctgr === category;
      const filterBySearch = ({ title, description, }) => [title, description].includes(search);

      if (category && search) {
        filterProducts = allProducts
          .filter(filterByCategory)
          .filter(filterBySearch);
      } else if (category) {
        filterProducts = allProducts.filter(filterByCategory);
      } else if (search) {
        filterProducts = allProducts.filter(filterBySearch);
      }

      return res.status(200).json({ ok: true, products: filterProducts, });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async add(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения данной операции нужно быть авторизованным", });
      }

      const { price, } = req.body;
      const productData = {
        ...req.body,
        price: parseInt(price),
        userId: req.userId,
        images: [],
      };

      if (req.files) {
        Object.keys(req.files).map((key) => productData.images.push(req.files[key].filename));
      }

      await ProductModel.create(productData);

      return res.status(200).json({ ok: true, message: "Товар создан", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async addToCart(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения следующей операции нужно быть авторизованным", });
      }

      const { id, } = req.params;
      const product = await ProductModel.findOne({ where: { id, }, });

      if (!product) {
        return res.status(404).json({ ok: false, message: "Такого товара не существует", });
      }

      if (product.userId === req.userId) {
        return res.status(403).json({ ok: false, message: "Вы не можете добавить свой товар в корзину", });
      }

      const cart = await Cart.findOne({ where: { userId: req.userId, }, });
      const userCartProducts = await CartProduct.findAll({ where: { cartId: cart.id, }, });
      const createNewCartProduct = async () => {
        const productData = Object.keys(product.dataValues).reduce((acc, key) => {
          if (!["id", "userId"].includes(key)) {
            acc[key] = product.dataValues[key];
          }

          return acc;
        }, {});
        const dataCartProduct = {
          ...productData,
          cartId: cart.id,
          productId: parseInt(id),
          userId: req.userId,
          quantity: 1,
        };

        await CartProduct.create(dataCartProduct);
      };

      if (userCartProducts && userCartProducts.length) {
        const findIndexProduct = userCartProducts.findIndex(({ productId, }) => productId === parseInt(id));

        if (findIndexProduct !== -1) {
          const findProduct = userCartProducts[findIndexProduct];

          await findProduct.update({ quantity: findProduct.quantity + 1, });
          await findProduct.save();
        } else {
          createNewCartProduct();
        }
      } else {
        createNewCartProduct();
      }

      return res.status(200).json({ ok: true, message: "Товар добавлен в корзину", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async remove(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения следующей операции нужно быть авторизованным", });
      }

      const { id, } = req.params;
      const product = await ProductModel.findOne({ where: { id, }, });

      if (!product) {
        return res.status(404).json({ ok: false, message: "Такого товара не существует", });
      }

      if (product.userId !== parseInt(req.userId)) {
        return res.status(403).json({ ok: false, message: "Нельзя удалить чужой товар", });
      }

      product.images.map((file) => {
        removeFile([__dirname, "../../", "productImages", file.replace(/^\/\_nuxt\/productImages\//, "")], res);
      });

      await product.destroy();

      return res.status(200).json({ ok: true, message: "Товар удален", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }

  async removeFromCart(req, res) {
    try {
      if (!req.isAuth) {
        return res.status(403).json({ ok: false, message: "Для выполнения следующей операции нужно быть авторизованным", });
      }

      const { id, } = req.params;
      const product = await CartProduct.findOne({ where: { id, }, });

      if (!product) {
        return res.status(404).json({ ok: false, message: "Такого товара не существует", });
      }

      if (product.userId !== parseInt(req.userId)) {
        return res.status(403).json({ ok: false, message: "Нельзя удалить чужой товар из корзины", });
      }

      await product.destroy();

      return res.status(200).json({ ok: true, message: "Товар удален из корзины", });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ ok: false, message: "Произошла ошибка сервера", });
    }
  }
}

module.exports = new Product();