const express = require("express");
const {
    getInventory,
    getSingleInventory,
    // createInventory,
    updateInventory,
    deleteInventory,
} = require("../controller/inventoryController");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getInventory);

router.get("/:id", getSingleInventory);

// router.post("/", createInventory);

router.patch("/:id", updateInventory);

router.delete("/:id", deleteInventory);

module.exports = router;
