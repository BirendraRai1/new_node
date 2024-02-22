const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  ProductsChildCat,
  ProductsCat,
  ProductsSubCat
} = require("../controller/productController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.post("/childCategory",ProductsChildCat);

router.post("/Category",ProductsCat);

router.post("/subCategory",ProductsSubCat);

module.exports = router;
