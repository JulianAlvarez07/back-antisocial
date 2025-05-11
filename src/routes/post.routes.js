const { Router } = require("express");
const { postController } = require("../controllers");
const { Post } = require("../db/models");

const route = Router();

route.get("/", postController.getPost);

route.get("/:id", postController.getPostById);

route.post("/", postController.createPost);

route.put("/:id", postController.updatePost);

route.delete("/:id", postController.deletePost);

module.exports = route;
