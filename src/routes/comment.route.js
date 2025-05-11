const { Router } = require("express");
const { commentController } = require("../controllers");
const { Tag } = require("../db/models");

const route = Router();

route.get("/", commentController.getComments);

//route.get("/:id", commentController.getCommentById);

route.delete("/:id", commentController.deleteCommentById);

module.exports = route;
