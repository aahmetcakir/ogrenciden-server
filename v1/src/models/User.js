const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    profile_image: String,
    university: String,
    campus: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Mongoose.model("user", UserSchema);
