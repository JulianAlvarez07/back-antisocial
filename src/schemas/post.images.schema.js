const Joi = require("joi");
const postImageSchema = Joi.object({
  url: Joi.string().uri().min(10).max(2048).required().messages({
    "string.uri": "La URL debe ser válida",
    "any.required": "La URL es obligatoria",
  }),
  userId: Joi.number().integer().required(),
});

module.exports = postImageSchema;
