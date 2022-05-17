const Product = require("../models/Products");

const insert = (productsData) => {
  const product = new Product(productsData);
  return product.save();
};

const list = () => {
  return Product.find();
};
const getProduct = (productId) => {
  return Product.findById(productId);
};
const remove = (productId) => {
  return Product.findByIdAndDelete(productId);
};
const update = (productId, productsData) => {
  return Product.findByIdAndUpdate(productId, productsData);
};
const searchByProductTitle = (productTitle) => {
  return Product.find({
    $text: { $search: productTitle, $caseSensitive: false },
  });
};
const filter = (productData) => {
  return Product.find({
    $and: [
      !productData.category ? {} : { category: productData.category },
      !productData.university ? {} : { university: productData.university },
      !productData.campus ? {} : { campus: productData.campus },
      !productData.minPrice ? {} : { price: { $gte: productData.minPrice } },
      !productData.maxPrice ? {} : { price: { $lte: productData.maxPrice } },
    ],
  });
};

module.exports = {
  insert,
  list,
  getProduct,
  searchByProductTitle,
  remove,
  update,
  filter,
};
