const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    title: String,
    price: String,
    category: String,
    university: String,
    campus: String,
    contact: String,
    description: String,
    images: Array,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Mongoose.model("products", ProductSchema);
