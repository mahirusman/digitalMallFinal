const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://ahmedAli:zxcasdqwe123@cluster0.rg04o.mongodb.net/finalPractical"
// );

mongoose.connect("mongodb://localhost:27017/digitalMall");

const db = mongoose.connection;

db.on("connected", () => {
  console.log("database is connected");
});

db.on("error", () => {
  console.log("database error");
});
module.exports = db;
