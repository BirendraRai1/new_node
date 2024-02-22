const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/* This is creating a new schema for the inventory model. */

const brandSchemaRules = {
  brand_name: {
    type: String,
    required:true,
  },
  brand_logo: {
    type: String,
    required:true
  },
  is_verify:{
   type:Boolean,
   default:true,
  },
  brand_relation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brandRelation",
  },
  brand_document: {
    type: String,
  },
  vender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  subcategory_id:[{  
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategoryModel",
  }]
};



const brand_relation = {
    name: {
      type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
  };

const BrandModel = new mongoose.Schema(brandSchemaRules, {
  timestamps: true,
});

const BrandRelation = new mongoose.Schema(brand_relation, {
    timestamps: true,
  });

let brand = mongoose.model("Brand", BrandModel);
let brand_relations = mongoose.model("brandRelation", BrandRelation);

module.exports = {brand , brand_relations}

