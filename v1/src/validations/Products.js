const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(5).max(70),
  price: Joi.string().required().min(1).max(10),
  category: Joi.string().required().min(2).max(20),
  university: Joi.string().required(),
  campus: Joi.string().required(),
  description: Joi.string().required().min(10).max(250),
  contact: Joi.string().required().min(11).max(13),
  images: Joi.array(),
});

module.exports = {
  createValidation,
};
