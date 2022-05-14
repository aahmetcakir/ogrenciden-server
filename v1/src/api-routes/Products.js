const express = require("express");
const router = express.Router();
const {
  create,
  index,
  getSingleProduct,
  searchProduct,
  removeProduct,
  updateProduct,
} = require("../controllers/Products");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Products");

router.get("/", index);
router.get("/:id", getSingleProduct);
router.delete("/:id", removeProduct);
router.route("/:id").put(validate(schemas.createValidation), updateProduct);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/search").post(validate(schemas.searchValidation), searchProduct);

module.exports = router;
