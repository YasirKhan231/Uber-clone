const userModel = require("../models/user.model");
const userservice = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registeruser = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  console.log(req.body);
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
