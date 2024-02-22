const express = require("express");
const authUser = require("../middlewares/auth");
const {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrandRelation,
  createBrandRelation,
  updateBrandRelation,
  deleteBrandRelation,
  getVendorBrand,
  getVendorBrandVerify,
} = require("../controller/brandController");

const router = express.Router();

// const filesPayloadExists = require("../middlewares/filesPayloadExists")
// const fileExtLimiter = require("../middlewares/fileExtLimiter");
// const fileSizeLimiter = require("../middlewares/fileSizeLimiter");

// filesPayloadExists,
//   fileSizeLimiter,
//   fileExtLimiter([".png", ".jpg", ".jpeg", ".ico"]),

// brand relation function working
router.get("/relation",authUser, getAllBrandRelation);

router.post("/relation",authUser, createBrandRelation);

router.patch("/relation/:id",authUser, updateBrandRelation);

router.delete("/relation/:id",authUser, deleteBrandRelation);

/* Creating the routes for the product controller. */
router.get("/",authUser, getAllBrands);

router.get("/:id",authUser, getSingleBrand);

router.post("/", authUser, createBrand);

router.post("/brandList",authUser, getVendorBrand);

router.post("/verifyBrandList", authUser, getVendorBrandVerify);

router.patch("/:id",authUser, updateBrand);

router.delete("/:id",authUser, deleteBrand);

module.exports = router;
