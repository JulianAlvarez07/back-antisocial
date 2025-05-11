const express = require("express");
const db = require("./db/models");
const app = express();
const {
  userRoute,
  postRoute,
  postImagesRoute,
  commentRoute,
  tagRoute,
} = require("./routes");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use("/users", userRoute);
app.use("/post", postRoute);
app.use("/post-images", postImagesRoute);
app.use("/comments", commentRoute);
app.use("/tags", tagRoute);
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`);
  //db.sequelize.sync({ force: true });
});
