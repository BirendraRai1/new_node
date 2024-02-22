const mongoose = require("mongoose");

const categorySchemaRules = {
  category_type: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  updated_By: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
};

const categorySchema = new mongoose.Schema(categorySchemaRules,{timestamps:true});
const categoryModel = mongoose.model("categoryModel", categorySchema);

module.exports = categoryModel;
