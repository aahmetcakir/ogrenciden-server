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
  return Product.findById(productId).populate({
    path: "user_id",
    select: "name surname email university campus",
  });
};
const remove = (productId) => {
  return Product.findByIdAndDelete(productId);
};
const update = (productId, productsData) => {
  return Product.findByIdAndUpdate(productId, productsData);
};

const findMyAds = (userId) => {
  return Product.find({ user_id: userId });
};

const searchByProductTitle = (productTitle) => {
  return Product.find({
    $text: { $search: productTitle, $caseSensitive: false },
  });
};
const filter = (productData) => {
  let query = {};
  if (productData.text) {
    query.$text = { $search: productData.text, $caseSensitive: false };
  }

  return Product.find({
    ...query,
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
  findMyAds,
};
