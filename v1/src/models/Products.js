const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Mongoose.model("products", ProductSchema);
