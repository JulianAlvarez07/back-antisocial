const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));
const {
  userRoute,
  postRoute,
  postImagesRoute,
  commentRoute,
  tagRoute,
  commentTagRoute,
} = require("./routes");

const PORT = process.env.PORT || 3001;

app.use(cors()); // Solo esta línea para que no haya problema CORS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API corriendo 🎉");
});

app.use("/users", userRoute);
app.use("/post", postRoute);
app.use("/post-images", postImagesRoute);
app.use("/comments", commentRoute);
app.use("/tags", tagRoute);
app.use("/comment-tags", commentTagRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    //await db.sequelize.sync({ force: true }); // Forzar una última sincronización
    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
};

// Iniciar el servidor solo después de inicializar la base de datos
initializeDatabase().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server corriendo en el puerto: ${PORT}`);
  });
});
