const mongoose = require("mongoose");

const organizationSchemaRules = {
  companyName: { type: String },
  registeredCompanyName: { type: String },
  registeredAddress: { type: String },
  gst_no: { type: String, default: "Not Available" },
  pan_number: { type: String, default: "Not Available" },
  TIN: { type: Number, default: "Not Available" },
  TAN: { type: Number, default: "Not Available" },
  MOU: { type: String, default: "Not Available" },
  manage_licence: { type: String, default: "Not Available" },
  contactAddress: [
    {
      type: Object,
    },
  ],
  bankingDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    cancelCheque: { type: String },
  },
};

// schema-> structure and validation
const organizationSchema = new mongoose.Schema(organizationSchemaRules);

// schema-> structure and validation
const organizationModel = mongoose.model(
  "organizationmodels",
  organizationSchema
);
module.exports = organizationModel;
