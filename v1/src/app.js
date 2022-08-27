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
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://ogrenciden.herokuapp.com"
//   );

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });
// app.use(cors());
app.use(
  cors({
    origin: "https://ogrenciden.herokuapp.com/products/filter",
    credentials: true,
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://ogrenciden.herokuapp.com"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("sunucu ayakta");
  app.use("/products", ProductsRoutes);
  app.use("/auth", UserRoutes);
});
