const User = require("../models/User");

const insert = (usersData) => {
  const user = new User(usersData);
  return user.save();
};

const list = () => {
  return User.find().sort({
    updatedAt: "desc",
  });
};
const getUser = (userId) => {
  return User.findById(userId);
};
const remove = (userId) => {
  return User.findByIdAndDelete(userId);
};
const update = (userId, usersData) => {
  return User.findByIdAndUpdate(userId, usersData);
};

module.exports = {
  insert,
  list,
  remove,
  update,
  getUser,
};
