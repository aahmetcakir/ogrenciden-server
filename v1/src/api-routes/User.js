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
const schemas = require("../validations/User");

router.get("/", index);
router.get("/:id", getSingleUser);
router.post("/login", loginUser);
router.delete("/:id", removeUser);
router.route("/:id").put(validate(schemas.updateValidation), updateUser);
router.route("/").post(validate(schemas.createValidation), create);

module.exports = router;
