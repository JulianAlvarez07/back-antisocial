const { Router } = require("express");
const { tagController } = require("../controllers");
const { Tag } = require("../db/models");

const route = Router();

route.get("/", tagController.getTag);

route.get("/:id", tagController.getTagById);

route.post("/", tagController.createTag);

route.delete("/:id", tagController.deleteTag);

module.exports = route;
