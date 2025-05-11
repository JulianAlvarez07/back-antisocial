const { Router } = require("express");
const { userController } = require("../controllers");
const { userMiddleware } = require("../middlewares");
const { User } = require("../db/models");
const { userSchema } = require("../schemas");

const route = Router();
route.get("/", userController.getUsers);

route.get(
  "/:id",
  userMiddleware.validateId,
  userMiddleware.existsModelById(User),
  userController.getUserByNickName
);

route.post(
  "/",
  userMiddleware.schemaValidator(userSchema),
  userController.createUser
);
//consultar si esta bien ponerlo aca
route.post("/:id/post", userController.createPost);
route.put(
  "/:id",
  userMiddleware.schemaValidator(userSchema),
  userController.updateUser
);

route.delete(
  "/:id",
  userMiddleware.validateId,
  userMiddleware.existsModelById(User),
  userController.deleteUserByNickName
);

module.exports = route;
