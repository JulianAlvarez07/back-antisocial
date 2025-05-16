const Joi = require("joi");

const schemaPost = Joi.object({
  contenido: Joi.string().required().max(2000).messages({
    "any.required": "El contenido es obligatorio",
    "string.empty": "El contenido no puede estar vacío",
    "string.max": "username debe tener como maximo {#limit} caractes",
  }),
  userId: Joi.number().integer().required(),
});

module.exports = schemaPost;
