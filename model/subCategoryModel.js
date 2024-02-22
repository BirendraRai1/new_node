const mongoose = require("mongoose");

const subCategorySchemaRules = {
  sub_category_type: { type: String },
  variant_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "variantModel",
  }],
  isActive: { type: Boolean },
  updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
    required: true,
  },
};

const subCategorySchema = new mongoose.Schema(subCategorySchemaRules,{timestamps:true});
const subCategoryModel = mongoose.model("subCategoryModel", subCategorySchema);

module.exports = subCategoryModel;
