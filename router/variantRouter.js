const express = require("express");
const authUser = require("../middlewares/auth");
const {
  getVariant,
  getSingleVariant,
  createVariant,
  updateVariant,
  deleteVariant,
} = require("../controller/variantController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getVariant);

router.get("/:id", getSingleVariant);

router.post("/", createVariant);

router.patch("/:id", updateVariant);

router.delete("/:id", deleteVariant);

module.exports = router;
