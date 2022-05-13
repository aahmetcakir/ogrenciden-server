const express = require("express");
const router = express.Router();
const { create, index } = require("../controllers/Products");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Products");

router.get("/", index);
router.route("/").post(validate(schemas.createValidation), create);

module.exports = router;
