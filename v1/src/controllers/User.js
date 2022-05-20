const {
  insert,
  list,
  remove,
  update,
  getUser,
  login,
} = require("../services/User");
const httpStatus = require("http-status");

const { passwordToHash } = require("../scripts/utils/helper");

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
  getUser(req.params.id)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });

      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const loginUser = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  login(req.body)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "User not found" });

      res.status(httpStatus.OK).send(result);
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

module.exports = {
  create,
  index,
  getSingleUser,
  removeUser,
  updateUser,
  loginUser,
};
