const { createToken, validateToken } = require("../middlewares/auth");
const { userService } = require("../services");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const body = req.body;

  const user = await userService.register(body);

  res.status(200).json({
    message: "user Created Successs",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await userService.findUser(username);
  if (!user) {
    res.status(400).json({
      messgae: "user not found!",
    });
  } else {
    if (user.password === password) {
      const token = createToken(user);
      res.cookie("access-token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        messgae: "user login success",
        token: token,
      });
    } else {
      res.status(400).json({
        message: "password invalid",
      });
    }
  }
};

const getProfile = (req, res) => {
  try {
    const token = req.cookies["access-token"];
    console.log(token);
    const user = validateToken(token);

    if (!user) {
      res.status(400).json({ message: "invalid token" });
    }
    res.json({ message: user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { registerUser, loginUser, getProfile };
