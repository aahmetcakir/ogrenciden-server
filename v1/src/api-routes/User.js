const express = require("express");
const router = express.Router();
const {
  create,
  index,
  getSingleUser,
  removeUser,
  updateUser,
  loginUser,
} = require("../controllers/User");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/User");

router.get("/:id", getSingleUser);
router.post("/login", loginUser);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/").get(authenticate, index);
router.route("/:id").delete(authenticate, removeUser);
router
  .route("/:id")
  .put(authenticate, validate(schemas.updateValidation), updateUser);

module.exports = router;
