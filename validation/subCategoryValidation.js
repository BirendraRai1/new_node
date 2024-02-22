const Joi = require("@hapi/joi");

const getSubCategoryAndVariantValidation = Joi.object({
    subCategoryId: Joi.string().required(),
});

const createSubCategoryValidation = Joi.object({
    category_id: Joi.string().required(),
    variant_id: Joi.array().required(),
    sub_category_type: Joi.string().required(),
    updated_By: Joi.string().required(),
});

module.exports = {
  getSubCategoryAndVariantValidation,
  createSubCategoryValidation
};
