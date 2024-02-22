const Joi = require("@hapi/joi");
const { Module } = require("module");

const postChildCategoryValidation = Joi.object({
    child_category_type : Joi.string().trim().required(),
    isActive : Joi.boolean().required(),
    sub_category_id : Joi.string().trim().required(),
    updated_By : Joi.string().trim().required()
})

const updatecategoryValidation = Joi.object({
    child_category_type : Joi.string().trim(),
    isActive : Joi.boolean(),
    sub_category_id : Joi.string().trim().required(),
    updated_By : Joi.string().trim().required()
})

module.exports =  {
    postChildCategoryValidation,
    updatecategoryValidation
}

