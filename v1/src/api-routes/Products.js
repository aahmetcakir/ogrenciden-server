const express = require("express");
const router = express.Router();
const {
  create,
  index,
  myAds,
  getSingleProduct,
  searchProduct,
  removeProduct,
  updateProduct,
  filterProduct,
} = require("../controllers/Products");
const validate = require("../middlewares/validate");

const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/Products");

router.get("/", index);
router.get("/:id", getSingleProduct);
router.route("/search").post(validate(schemas.searchValidation), searchProduct);
router.route("/filter").post(validate(schemas.filterValidation), filterProduct);

router.route("/:id").delete(authenticate, removeProduct);
router.route("/my-ads/:id").get(authenticate, myAds);
router
  .route("/:id")
  .put(authenticate, validate(schemas.createValidation), updateProduct);
router
  .route("/")
  .post(authenticate, validate(schemas.createValidation), create);

module.exports = router;
