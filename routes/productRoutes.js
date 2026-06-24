const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

//all products
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
//specific products
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
