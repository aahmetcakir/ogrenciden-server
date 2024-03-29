const {
  insert,
  list,
  getProduct,
  searchByProductTitle,
  remove,
  findMyAds,
  update,
  filter,
} = require("../services/Products");
const httpStatus = require("http-status");

const create = (req, res) => {
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
const myAds = (req, res) => {
  findMyAds(req.params.id)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const getSingleProduct = (req, res) => {
  getProduct(req.params.id)
    .then((result) => {
      if (!result)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Ads not found" });

      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const removeProduct = (req, res) => {
  remove(req.params.id)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const searchProduct = (req, res) => {
  searchByProductTitle(req.body.title)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const updateProduct = (req, res) => {
  update(req.params.id, req.body)
    .then((result) => {
      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};
const filterProduct = (req, res) => {
  const filters = { ...req.body };
  filter(filters)
    .then((result) => {
      const isResultEmpty = !Object.keys(result).length;
      if (isResultEmpty)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Product Not found" });

      res.status(httpStatus.OK).send(result);
    })
    .catch((err) => {
      res.status(httpStatus.NOT_FOUND).send(err);
    });
};

module.exports = {
  create,
  index,
  myAds,
  getSingleProduct,
  searchProduct,
  removeProduct,
  updateProduct,
  filterProduct,
};
