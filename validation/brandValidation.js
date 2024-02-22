const Joi = require("@hapi/joi");


const brandValidation = Joi.object({
    brand_name: Joi.string().trim().required(),
    brand_relation: Joi.string().required(),
    subcategory_id:Joi.string().required(),
    brand_logo:Joi.string(),
    brand_document:Joi.string(),
  });
  
const brandRelationValidation = Joi.object({
  name: Joi.string().trim().required(),
  user_id: Joi.string(),
});


module.exports = {
    brandRelationValidation,
    brandValidation
};
