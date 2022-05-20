const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    title: String,
    price: Number,
    category: String,
    university: String,
    campus: String,
    contact: String,
    description: String,
    images: String,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
ProductSchema.index({ title: "text" });

module.exports = Mongoose.model("products", ProductSchema);
