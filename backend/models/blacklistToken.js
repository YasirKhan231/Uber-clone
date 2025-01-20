const moongoose = require("mongoose");

const blackListTokenSchema = new moongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});

module.exports = moongoose.model("blackListTokenSchema", blackListTokenSchema);
