const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the product model. */
const productSchemaRules = {
  product_title: {
    type: String,
    required: true,
  },
  product_image: [
    {
      type: String,
    },
  ],
  selected_variant: [
    {
      variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variantModel",
      },
      variant_values: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "variantValuesModel",
      },
    },
  ],
  product_description:[{
    type: String,
    required: true,
  }],
  min_order_quantity: {
    type: Number,
    required: true,
  },
  child_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "childCategoryModel",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
  },
  subCategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategoryModel",
  },
  product_approved: {
    type: Boolean,
    default: false,
  },
  brand_name: {
    type: String,
    required: true,
  },
  search_terms: [{
    type: String,
    required: true,
  }],
  HSN_code: {
    type: String,
    required: true,
  },
  minimum_order_quantity: {
    type: String,
    required: true,
  },
  product_tax_code: {
    type: String,
    required: true,
  },
};

const ProductModel = new mongoose.Schema(productSchemaRules, {
  timestamps: true,
});

module.exports = mongoose.model("Product", ProductModel);
