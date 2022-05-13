const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loader = require("./loaders");
const app = express();
const { ProductsRoutes } = require("./api-routes");
config();
loader();
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  console.log("sunucu ayakta");
  app.use("/products", ProductsRoutes.router);
});
