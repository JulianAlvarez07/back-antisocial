const { Router } = require("express");
const { postImagesController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");

const route = Router();

route.get("/", postImagesController.getImages);

route.get(
  "/:id",
  genericMiddleware.validarPost,
  postImagesController.getImagesByPost
);
//se crea en la ruta post
//route.post("/", postImagesController.createImage);

route.delete(
  "/:id",
  genericMiddleware.validarPost,
  postImagesController.deleteImageById
);

module.exports = route;
