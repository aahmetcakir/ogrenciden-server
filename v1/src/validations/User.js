const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  surname: Joi.string().required().min(2).max(30),
  email: Joi.string().email().required(),
  university: Joi.string().required(),
  campus: Joi.string().required(),
  password: Joi.string().required().min(8),
  // images: Joi.required(),
});
const updateValidation = Joi.object({
  name: Joi.string().min(3).max(50),
  surname: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  university: Joi.string(),
  campus: Joi.string(),
  password: Joi.string().min(8),
  // images: Joi,
});

module.exports = {
  createValidation,
  updateValidation,
};
