const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3).max(70),
  price: Joi.number().required().min(0).max(999999),
  category: Joi.string().required().min(2).max(20),
  university: Joi.string().required(),
  campus: Joi.string().required(),
  description: Joi.string().required().min(10).max(250),
  contact: Joi.string().required().min(10).max(13),
  images: Joi.array().required().min(1).max(4),
  user_id: Joi.string().required(),
});
const searchValidation = Joi.object({
  title: Joi.string().required().min(3).max(70),
});
const filterValidation = Joi.object({
  text: Joi.string().min(3).max(70),
  category: Joi.string().min(2).max(20),
  university: Joi.string(),
  campus: Joi.string(),
  maxPrice: Joi.number().min(0).max(999999),
  minPrice: Joi.number().min(0).max(999999),
  sortDate: Joi.string(),
  sortPrice: Joi.string(),
});

module.exports = {
  createValidation,
  searchValidation,
  filterValidation,
};
