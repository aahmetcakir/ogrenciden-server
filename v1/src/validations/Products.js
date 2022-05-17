const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(5).max(70),
  price: Joi.string().required().min(1).max(10),
  category: Joi.string().required().min(2).max(20),
  university: Joi.string().required(),
  campus: Joi.string().required(),
  description: Joi.string().required().min(10).max(250),
  contact: Joi.string().required().min(11).max(13),
  // images: Joi.required(),
});
const searchValidation = Joi.object({
  title: Joi.string().required().min(3).max(70),
});
const filterValidation = Joi.object({
  category: Joi.string().min(2).max(20),
  university: Joi.string(),
  campus: Joi.string(),
  maxPrice: Joi.string().min(1).max(10),
  minPrice: Joi.string().min(1).max(10),
});

module.exports = {
  createValidation,
  searchValidation,
  filterValidation,
};
