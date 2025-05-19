const { Router } = require("express");
const { postController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { commentSchema, postImagesSchema, postSchema } = require("../schemas");
const route = Router();

route.get("/", postController.getPost);

route.get("/:id", genericMiddleware.validatePost, postController.getPostById);

route.post(
  "/",
  genericMiddleware.schemaValidator(postSchema),
  genericMiddleware.validateUser("userId"),
  postController.createPost
);

route.put("/:id", genericMiddleware.validatePost, postController.updatePost);

route.delete("/:id", genericMiddleware.validatePost, postController.deletePost);

route.post(
  "/:id/images",
  genericMiddleware.schemaValidator(postImagesSchema),
  genericMiddleware.validatePost,
  genericMiddleware.validateUser("userId"),
  postController.createImageByPost
);

route.post(
  "/:id/comment",
  genericMiddleware.schemaValidator(commentSchema),
  genericMiddleware.validatePost,
  genericMiddleware.validateUser("userIdComment"),
  postController.createCommentByPost
);

module.exports = route;
