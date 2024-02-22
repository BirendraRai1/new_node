const Joi = require("@hapi/joi");

const postCategoryValidation = Joi.object({
    category_type : Joi.string().trim().required(),
    isActive : Joi.boolean().required(),
    updated_By : Joi.string().trim().required()
})

const updatecategoryValidation = Joi.object({
    category_type : Joi.string().trim(),
    isActive : Joi.boolean(),
    updated_By : Joi.string().trim().required()
})

module.exports = {
    postCategoryValidation,
    updatecategoryValidation,

  };