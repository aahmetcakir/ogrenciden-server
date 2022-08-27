const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const loader = require("./loaders");
const app = express();
const { ProductsRoutes, UserRoutes } = require("./api-routes");
config();
loader();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(helmet());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.ogrenciden.co/"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("sunucu ayakta");
  app.use("/products", ProductsRoutes);
  app.use("/auth", UserRoutes);
});
