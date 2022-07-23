const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");
const isAuth = require("../middleware/isAuth");

router.get("/api/:id", userController.getOne);
router.get("/api/:id/cart", isAuth, userController.getCartProducts);
router.get("/api/:id/products", isAuth, userController.getProducts);
router.put("/:id/edit", isAuth, userController.edit);

module.exports = router;