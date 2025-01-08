const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to the database ");
    })

    .catch((err) => console.log(err));
}
module.exports = connectToDb;
