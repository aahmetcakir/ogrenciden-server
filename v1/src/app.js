const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const loader = require("./loaders");
const app = express();
const { ProductsRoutes, UserRoutes } = require("./api-routes");
config();
loader();
app.use(express.json());
app.use(helmet());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log("sunucu ayakta");
  app.use("/products", ProductsRoutes);
  app.use("/auth", UserRoutes);
});
