const express = require("express");
const router = express.Router();
const {
  create,
  index,
  getSingleProduct,
  searchProduct,
} = require("../controllers/Products");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Products");

router.get("/", index);
router.get("/:id", getSingleProduct);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/search").post(validate(schemas.searchValidation), searchProduct);

module.exports = router;
