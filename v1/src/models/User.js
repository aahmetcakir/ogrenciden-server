const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    surname: String,
    email: {
      type: String,
      unique: true,
    },
    profile_image: String,
    university: String,
    campus: String,
    password: String,
    favorites: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Mongoose.model("user", UserSchema);
