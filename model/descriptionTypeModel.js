const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/* This is creating a new schema for the inventory model. */

const descriptionSchema = {
  description_name:{
    type: String,
  },
  value: [{
    type: String,
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
},
};


const DescriptionModel = new mongoose.Schema(descriptionSchema, {
  timestamps: true,
});



let Description = mongoose.model("descriptionType", DescriptionModel);
module.exports = Description

