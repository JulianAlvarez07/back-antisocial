const { Router } = require("express")
const { postImagesController } = require("../controllers")

const route = Router()

route.get("/", postImagesController.getImages)

route.get("/:id", postImagesController.getImagesByPost)

route.post("/", postImagesController.createImage)

route.delete("/:id", postImagesController.deleteImageById)

module.exports = route
