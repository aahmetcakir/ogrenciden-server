const {
  insert,
  list,
  remove,
  update,
  getUser,
  login,
  insertFavorite,
  fetchFavorite,
  removeFavorite,
} = require("../services/User");
const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  insert(req.body)
    .then((result) => {
      res.status(httpStatus.CREATED).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const loginUser = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  login(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });

      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };

      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const index = (req, res) => {
  list()
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const getSingleUser = (req, res) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  let decoded;
  try {
    decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  getUser(decoded._doc._id)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });
      const user = {
        ...result.toObject(),
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};

const removeUser = (req, res) => {
  remove(req.params.id)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const updateUser = (req, res) => {
  if (req.body.password) {
    req.body.password = passwordToHash(req.body.password);
  }

  update(req.params.id, req.body)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const addFavorite = (req, res) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  let decoded;
  try {
    decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  const productId = req.body.productId;
  insertFavorite(decoded._doc._id, productId)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const deleteFavorite = (req, res) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  let decoded;
  try {
    decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  const productId = req.body.productId;
  removeFavorite(decoded._doc._id, productId)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};

const getFavorites = (req, res) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  let decoded;
  try {
    decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
  fetchFavorite(decoded._doc._id)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });
      const user = {
        ...result.toObject(),
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};

module.exports = {
  create,
  index,
  getSingleUser,
  removeUser,
  updateUser,
  loginUser,
  addFavorite,
  getFavorites,
  deleteFavorite,
};
