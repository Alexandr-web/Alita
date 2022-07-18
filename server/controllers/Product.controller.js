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
}

module.exports = new Product();