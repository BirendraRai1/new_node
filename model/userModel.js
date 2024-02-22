const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// ecommerce -> Amazon
const userSchemaRules = {
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  alt_number:{
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizationmodels",
  },
  otp: {
    type: Number,
  },
  roles: {
    type: String,
    default: "customer",
  },
  verifyStatus: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
  user_code: {
    type: String,
  },
  sellor_code: {
    type: String,
  },
  Permissions: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  email_verify: {
    type: Boolean,
    default: false,
  },
};
// schema-> structure and validation
const userSchema = new mongoose.Schema(userSchemaRules, { timestamps: true });

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
});

// this model -> will have queries
const UserModel = mongoose.model("userModel", userSchema);
module.exports = UserModel;
