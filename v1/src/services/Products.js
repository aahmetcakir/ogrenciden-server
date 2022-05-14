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

module.exports = {
  insert,
  list,
  getProduct,
  searchByProductTitle,
  remove,
  update,
};
