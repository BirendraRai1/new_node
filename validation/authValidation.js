const Joi = require("@hapi/joi");

const signUpValidation = Joi.object({
  name: Joi.string().trim().required(),
  number: Joi.number().min(1000000000).max(9999999999).integer().required(),
  alt_number: Joi.number().min(1000000000).max(9999999999).integer(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  pincode: Joi.number().min(100000).max(999999).required(),
  password: Joi.string().trim().min(8).required(),
  confirmPassword: Joi.string().trim().min(8).required(),
  roles: Joi.string().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().trim().required(),
  password: Joi.string().trim().min(8).required(),
  confirmPassword: Joi.string().trim().min(8).required(),
});

const sendEmailResetPasswordValidation = Joi.object({
  email: Joi.string().email().trim().required(),
});

const passwordUpdateValidation = Joi.object({
  password: Joi.string().trim().required(),
  confirmPassword: Joi.string().trim().required(),
});

const loginStaffValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

const createStaffValidation = Joi.object({
  name: Joi.string().trim().required(),
  number: Joi.number().min(1000000000).max(9999999999).integer().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(8).required(),
  role: Joi.string().required(),
});

module.exports = {
  signUpValidation,
  loginValidation,
  changePasswordValidation,
  sendEmailResetPasswordValidation,
  passwordUpdateValidation,
  loginStaffValidation,
  createStaffValidation,
};
