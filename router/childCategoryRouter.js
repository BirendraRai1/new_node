const express = require("express");
const router  = express.Router();
const {postChildCategory , getAllChildCategory , getChildcategoryByID , updateChildcategory , deleteChildCategory , createMultiChildCategory , getChildData} = require("../controller/childCategoryController");


router.post("/",postChildCategory);
router.post("/getAllChild",getChildData);
router.get("/",getAllChildCategory);
router.get("/:id",getChildcategoryByID);
router.patch("/:id",updateChildcategory);
router.delete("/:id",deleteChildCategory);

router.get("/llll",createMultiChildCategory);

module.exports =  router