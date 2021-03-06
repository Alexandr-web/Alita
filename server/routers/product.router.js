const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product.controller");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "productImages");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, });

router.get("/api/:id", productController.getOne);
router.get("/api", productController.getAll);
router.post("/add", isAuth, upload.array("productImages"), productController.add);
router.post("/:id/cart/add", isAuth, productController.addToCart);
router.delete("/:id/remove", isAuth, productController.remove);
router.delete("/:id/cart/remove", isAuth, productController.removeFromCart);

module.exports = router;