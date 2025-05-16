const { Router } = require("express");
const { userController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { User } = require("../db/models");
const { userSchema } = require("../schemas");

const route = Router();
route.get("/", userController.getUsers);

route.get(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.existsModelById(User),
  userController.getUserByNickName
);

route.post(
  "/",
  genericMiddleware.schemaValidator(userSchema),
  userController.createUser
);

route.put(
  "/:id",
  genericMiddleware.schemaValidator(userSchema),
  userController.updateUser
);

route.delete(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.existsModelById(User),
  userController.deleteUserByNickName
);

module.exports = route;
