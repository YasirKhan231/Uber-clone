const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const userroute = require("./routes/user.route");
const connectToDb = require("./db/db");
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(" hi ffrom  themain  route ");
});

app.use("/user", userroute);

module.exports = app;
