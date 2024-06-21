const mongoose = require("mongoose");
const transactionschema = new mongoose.Schema({
  info: String,
  date: String,
  description: String,
  price: Number,
});

const transactionmodel = mongoose.model("transactionmodel", transactionschema);
module.exports = transactionmodel;
