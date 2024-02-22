const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/* This is creating a new schema for the inventory model. */

const offerSchemaRules = {
  title:{
    type:String,
  },
  banner: {
    type: String,
  },
  discount_type: [{
    type: String,
    required:true
  }],
  is_verify:{
   type:Boolean,
   default:true,
  },
  product_link: {
    type: String,
  },
  name: {
    type: String,
  },
   startDate: {
    type: Date,
  },
  endDate:{  
      type: Date,
  }
};



const OfferModel = new mongoose.Schema(offerSchemaRules, {
  timestamps: true,
});

let offer = mongoose.model("Offer", OfferModel);

module.exports = {offer}

