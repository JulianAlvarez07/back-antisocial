const userSchema = require("./user.schema")
const postSchema = require("./post.schema")
const tagSchema = require("./tag.schema")
const { commentSchema, updateComentarioSchema } = require("./comment.schemas")

const postImagesSchema = require("./post.images.schema")

module.exports = {
  userSchema,
  postSchema,
  commentSchema,
  postImagesSchema,
  updateComentarioSchema,
  tagSchema,
}
