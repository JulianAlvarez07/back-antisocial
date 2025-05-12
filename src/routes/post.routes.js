const { Router } = require("express");
const { postController } = require("../controllers");
const { Post } = require("../db/models");

const route = Router();

route.get("/", postController.getPost);

route.get("/:id", postController.getPostById);

//ya anda esto, para crear desde la ruta /post
route.post("/", postController.createPost);

route.put("/:id", postController.updatePost);

route.delete("/:id", postController.deletePost);
// ruta alternativa - ver si esta bien
route.post("/:id/images", postController.createImageByPost);

route.post("/:id/comment", postController.createCommentByPost);

module.exports = route;
