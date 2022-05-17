const express = require("express");
const router = express.Router();
const {
  create,
  index,
  getSingleUser,
  removeUser,
  updateUser,
} = require("../controllers/User");
const validate = require("../middlewares/validate");
const schemas = require("../validations/User");

router.get("/", index);
router.get("/:id", getSingleUser);
router.delete("/:id", removeUser);
router.route("/:id").put(validate(schemas.createValidation), updateUser);
router.route("/").post(validate(schemas.createValidation), create);

module.exports = router;
