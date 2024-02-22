const express = require("express");

const {
  getOffer,
  getSingleOffer,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../controller/offerController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getOffer);

router.get("/:id", getSingleOffer);

router.post("/", createOffer);

router.patch("/:id", updateOffer);

router.delete("/:id", deleteOffer);



module.exports = router;
