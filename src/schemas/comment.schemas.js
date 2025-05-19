const Joi = require("joi");

const commentSchema = Joi.object({
  comentario: Joi.string().min(3).max(500).required().messages({
    "string.empty": "El comentario no puede estar vacío",
    "string.min": "El comentario debe tener al menos 3 caracteres",
    "string.max": "El comentario no puede tener más de 500 caracteres",
    "any.required": "El comentario es obligatorio",
  }),
  userIdComment: Joi.number().integer().required(),
});

const updateCommentSchema = Joi.object({
  comentario: Joi.string().min(3).max(500).required().messages({
    "string.empty": "El comentario no puede estar vacío",
    "string.min": "El comentario debe tener al menos 3 caracteres",
    "string.max": "El comentario no puede tener más de 500 caracteres",
    "any.required": "El comentario es obligatorio",
  }),
});

module.exports = { commentSchema, updateCommentSchema };
