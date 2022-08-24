const express = require("express");
const router = express.Router();
const {
  create,
  index,
  getSingleUser,
  removeUser,
  updateUser,
  loginUser,
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/User");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/User");

router.route("/me").get(authenticate, getSingleUser);
router.post("/login", loginUser);
router.post("/favorite", addFavorite);
router.delete("/favorite", deleteFavorite);
router.get("/favorite", getFavorites);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/").get(authenticate, index);
router.route("/:id").delete(authenticate, removeUser);
router
  .route("/:id")
  .put(authenticate, validate(schemas.updateValidation), updateUser);

module.exports = router;
