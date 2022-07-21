const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");

router.get("/api/:id", userController.getOne);
router.get("/api/:id/cart", userController.getCartProducts);
router.get("/api/:id/products", userController.getProducts);

module.exports = router;