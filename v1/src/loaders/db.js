const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("DB bağlandı");
});

const connectDB = async () => {
  await Mongoose.connect(
    process.env.ENV === "dev"
      ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      : `mongodb+srv://aahmetcakir:ahomahobeko@ogrenciden.j2bh1.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};
