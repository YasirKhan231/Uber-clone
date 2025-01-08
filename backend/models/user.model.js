const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, " first name should be minimum 3 length"],
    },
    lastName: {
      type: String,
      minlength: [3, "last name i should be minimum 3 lenght"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "email must be long than 5 "],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userschema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userschema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userschema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userschema);

module.exports = userModel;
