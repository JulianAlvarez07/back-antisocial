const express = require("express")
const cors = require("cors")
const db = require("./db/models")
const app = express()
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const path = require("path")
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"))
const {
  userRoute,
  postRoute,
  postImagesRoute,
  commentRoute,
  tagRoute,
  commentTagRoute,
} = require("./routes")

const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors())
app.use("/users", userRoute)
app.use("/post", postRoute)
app.use("/post-images", postImagesRoute)
app.use("/comments", commentRoute)
app.use("/tags", tagRoute)
app.use("/comment-tags", commentTagRoute)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`)
  //db.sequelize.sync({ force: true })
})
