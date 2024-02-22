const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/* This is creating a new schema for the inventory model. */

const inventorySchemaRules = {
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  variantValuesCombo: {
    type: String,
  },
  sku: {
    type: String,
  },
  stock: {
    type: Number,
  },
  FC_shelf_life_unit: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  price: {
    actual_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
  },
};

const InventoryModel = new mongoose.Schema(inventorySchemaRules, {
  timestamps: true,
});

module.exports = mongoose.model("Inventory", InventoryModel);
