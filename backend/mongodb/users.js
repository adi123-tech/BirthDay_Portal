const mongoose = require("mongoose");
const BirthdayportalSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  Email: String,
  Password: String,
});

module.exports = mongoose.model("Users", BirthdayportalSchema);
