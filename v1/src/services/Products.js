const Product = require("../models/Products");

const insert = (productsData) => {
  const product = new Product(productsData);
  return product.save();
};

const list = () => {
  return Product.find().sort({
    updatedAt: "desc",
  });
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
  console.log(productData);
  return Product.find({
    $and: [
      !productData.category ? {} : { category: productData.category },
      !productData.university ? {} : { university: productData.university },
      !productData.campus ? {} : { campus: productData.campus },
      !productData.minPrice
        ? {}
        : { price: { $gte: parseInt(productData.minPrice) } },
      !productData.maxPrice
        ? {}
        : { price: { $lte: parseInt(productData.maxPrice) } },
    ],
  }).sort(
    productData.sortPrice
      ? { price: productData.sortPrice || "asc" }
      : {
          updatedAt: productData.sortDate || "desc",
        }
  );
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
