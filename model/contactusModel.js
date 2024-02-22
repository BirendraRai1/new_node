const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// ecommerce -> Amazon
const contactSchemaRules = {
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  userType:{
    type: String,
    required: true,
  }
};
// schema-> structure and validation
const contactSchema = new mongoose.Schema(contactSchemaRules, { timestamps: true });

// this model -> will have queries
const ContactModel = mongoose.model("contactUsModel", contactSchema);
module.exports = ContactModel;
