const mongoose = require("mongoose");

const variantSchemaRules = {
  name: { type: String,  unique : true, required: true },
  updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
};

const variantSchema = new mongoose.Schema(variantSchemaRules,{timestamps:true});
const variantModel = mongoose.model("variantModel", variantSchema);

module.exports = variantModel;
