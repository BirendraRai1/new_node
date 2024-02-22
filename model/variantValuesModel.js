const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the variantValues model. */
const variantValuesSchemaRules = {
  variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variantModel",
  },
  value: [{ type: String, required: true }],
  colorCode: [{ type: String }],
  updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
};

const variantValuesSchema = new mongoose.Schema(variantValuesSchemaRules,{timestamps:true});
const variantValuesModel = mongoose.model(
  "variantValuesModel",
  variantValuesSchema
);

module.exports = variantValuesModel;
