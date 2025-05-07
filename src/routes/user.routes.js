const { Router } = require("express")
const { userController } = require("../controllers")

const route = Router()
route.get("/", userController.getUsers)

route.get("/:id", userController.getUserById)

route.post("/", userController.createUser)

route.put("/:id", userController.updateUser)

route.delete("/:id", userController.deleteUser)
module.exports = route
