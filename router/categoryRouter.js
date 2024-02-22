const express = require("express");

const router = express.Router();

const {
  postCategory,
  getCategorySubCategoryChildCategory,
  updatecategory,
  deleteCategory,
  getSingleCategory,
} = require("../controller/categoryController");

router.post("/", postCategory);

router.get("/", getCategorySubCategoryChildCategory);

router.get("/:id", getSingleCategory);

router.patch("/:id", updatecategory);

router.delete("/:id", deleteCategory);

module.exports = router;
