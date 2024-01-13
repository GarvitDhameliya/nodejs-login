const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const { username, _id } = user;
  const token = jwt.sign({ username, _id }, process.env.SECRET);
  return token;
};

const validateToken = (token) => {
  const validateToken = jwt.verify(token, process.env.SECRET);
  if (validateToken) {
    return validateToken;
  }
};

module.exports = { createToken, validateToken };
