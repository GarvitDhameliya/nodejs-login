const { userSchema } = require("../models");
const register = (body) => {
  return userSchema.create(body);
};

const login = (body) => {};

const findUser = (username) => {
  return userSchema.findOne({ username });
};

module.exports = { register, findUser, login };
