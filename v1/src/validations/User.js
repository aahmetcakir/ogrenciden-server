const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(3).max(30),
  surname: Joi.string().required().min(2).max(20),
  email: Joi.string().email(),
  university: Joi.string().required(),
  campus: Joi.string().required(),
  // images: Joi.required(),
});

module.exports = {
  createValidation,
};
