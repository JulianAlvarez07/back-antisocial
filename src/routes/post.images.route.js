const { Router } = require("express");
const { postImagesController } = require("../controllers");
const { Post_Images } = require("../db/models");

const route = Router();

route.get("/", postImagesController.getImages);

route.get("/:id", postImagesController.getImagesById);

route.post("/", postImagesController.createImage);

route.delete("/:id", postImagesController.deleteImage);

module.exports = route;
