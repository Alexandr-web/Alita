const ProductModel = require("../models/Product");

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
}

module.exports = new Product();