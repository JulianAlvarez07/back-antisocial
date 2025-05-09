const express = require("express");
const db = require("./db/models");
const app = express();
const { userRoute } = require("./routes");

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use("/users", userRoute);
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`);
  //db.sequelize.sync({ force: true });
});
