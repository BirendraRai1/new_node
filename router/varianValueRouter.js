const express = require("express");
const {
  getVariantValue,
  getSingleVariantValue,
  createVariantValue,
  updateVariantValue,
  deleteVariantValue,
  postVariantvalue
} = require("../controller/variantValueController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getVariantValue);

router.get("/:id", getSingleVariantValue);

router.post("/", createVariantValue);

router.post("/getvalue", postVariantvalue);

router.patch("/:id", updateVariantValue);

router.delete("/:id", deleteVariantValue);

module.exports = router;
