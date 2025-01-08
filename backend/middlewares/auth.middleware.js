const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

module.exports.authuser = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization.spilit("")[1];
  if (!token) {
    return res.status(401).json({ msg: " unauthorize" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthorize user" });
  }
};
