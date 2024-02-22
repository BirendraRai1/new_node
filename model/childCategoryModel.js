const mongoose = require("mongoose");

const childCategorySchemaRules = {
  child_category_type: { type: String },
  isActive: { type: Boolean },
  updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  sub_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategoryModel",
  },
};

const childCategorySchema = new mongoose.Schema(childCategorySchemaRules,{timestamps:true});
const childCategoryModel = mongoose.model(
  "childCategoryModel",
  childCategorySchema
);

module.exports = childCategoryModel;
