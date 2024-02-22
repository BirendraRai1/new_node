const express = require("express");

const {
  getDescription,
  getSingleDescription,
  createDescription,
  updateDescription,
  deleteDescription
} = require("../controller/descriptionTypeController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getDescription);

router.get("/:id", getSingleDescription);

router.post("/", createDescription);

router.patch("/:id", updateDescription);

router.delete("/:id", deleteDescription);

module.exports = router;
