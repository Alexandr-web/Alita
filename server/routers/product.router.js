const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product.controller");

router.get("/api/:id", productController.getOne);

module.exports = router;