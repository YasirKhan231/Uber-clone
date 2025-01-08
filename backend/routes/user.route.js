const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../controller/user.controller");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage(" first name must be 3 character long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("it should be min 6 character "),

  usercontroller.registeruser,
]);

module.exports = router;
