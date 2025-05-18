const { Router } = require("express")
const { commentTagController } = require("../controllers")
const { Tag, Post } = require("../db/models")
const genericMiddleware = require("../middlewares/generic.middleware")

const route = Router()

route.post(
  "/",
  genericMiddleware.validarPostById("postId"),
  genericMiddleware.validarTag("tagId"),
  commentTagController.createCommentTag
)
route.delete(
  "/",
  genericMiddleware.validarPostById("postId"),
  genericMiddleware.validarTag("tagId"),
  commentTagController.deleteCommentTag
)
route.get(
  "/post/:id",
  genericMiddleware.validarPost,
  commentTagController.getCommentTags
)

module.exports = route
