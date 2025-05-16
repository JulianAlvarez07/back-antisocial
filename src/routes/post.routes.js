const { Router } = require("express");
const { postController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { commentSchema, postImagesSchema, postSchema } = require("../schemas");
const route = Router();

route.get("/", postController.getPost);

route.get("/:id", genericMiddleware.validarPost, postController.getPostById);

//ya anda esto, para crear desde la ruta /post
route.post(
  "/",
  genericMiddleware.schemaValidator(postSchema),
  genericMiddleware.validarUsuario("userId"),
  postController.createPost
);

route.put("/:id", genericMiddleware.validarPost, postController.updatePost);

route.delete("/:id", genericMiddleware.validarPost, postController.deletePost);
// ruta alternativa - ver si esta bien
route.post(
  "/:id/images",
  genericMiddleware.schemaValidator(postImagesSchema),
  genericMiddleware.validarPost,
  genericMiddleware.validarUsuario("userId"),
  postController.createImageByPost
);

route.post(
  "/:id/comment",
  genericMiddleware.schemaValidator(commentSchema),
  genericMiddleware.validarPost,
  genericMiddleware.validarUsuario("userIdComment"),
  postController.createCommentByPost
);

module.exports = route;
