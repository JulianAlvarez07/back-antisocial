const { Router } = require("express")
const { commentTagController } = require("../controllers")
const { Tag, Comment } = require("../db/models")
const route = Router()

route.post("/", commentTagController.createCommentTag)
route.delete("/", commentTagController.deleteCommentTag)
route.get("/post/:id", commentTagController.getCommentTags)

module.exports = route
