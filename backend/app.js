const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const userroute = require("./routes/user.route");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

app.get("/", (req, res) => {
  res.send(" hi ffrom  themain  route ");
});

app.use("/user", userroute);

module.exports = app;
