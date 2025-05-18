const { Router } = require("express")
const { commentController } = require("../controllers")
const { Tag } = require("../db/models")
const { genericMiddleware } = require("../middlewares")
const { commentSchema, updateComentarioSchema } = require("../schemas")
const route = Router()

route.get("/", commentController.getComments)

//route.get("/:id", commentController.getCommentById);

route.put(
  "/:id",
  genericMiddleware.schemaValidator(updateComentarioSchema),
  commentController.updateCommentById
)

route.delete(
  "/:id",
  genericMiddleware.validarComentario,
  commentController.deleteCommentById
)

module.exports = route
