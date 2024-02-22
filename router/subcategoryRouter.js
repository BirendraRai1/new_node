const express = require("express");
const {
  getSubCategoryAndVariant,
  getSubSingle,
  createSubCategory,
  updateSub,
  deleteSub,
  getAllSub,
  getSubCategoryChildCategory
} = require("../controller/subCategoryController");

const router = express.Router();

/* Creating the routes for getting subCategory And Variant */
router.post("/getSubCategoryAndVariant", getSubCategoryAndVariant);

router.get("/", getAllSub);


router.get("/subcateAndChildCate", getSubCategoryChildCategory);

router.get("/:id", getSubSingle);

router.post("/", createSubCategory);

router.patch("/:id", updateSub);

router.delete("/:id", deleteSub);

module.exports = router;
