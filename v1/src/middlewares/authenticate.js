const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  console.log(token);

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ error: "Bu işlemi yapmak için önce giriş yapmalısınız." });
  }

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: "Token süresi geçmiş" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
