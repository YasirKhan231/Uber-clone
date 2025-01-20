const userModel = require("../models/user.model");
const userservice = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken");
module.exports.registeruser = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);

  try {
    const user = await userservice.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();
    res.status(200).json({ user: user, token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next(err); // Pass other errors to the next error handler
  }
};

module.exports.loginuser = async function (req, res, next) {
  const { email, password } = await req.body;
  const user = await userModel.findOne({ email }).select("password");
  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ msg: " invalid email or password" });
  }
  const token = await user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ user: user, token });
};

module.exports.getUserProfile = async function (req, res, next) {};

module.exports.logoutUser = async function (req, res, next) {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};
