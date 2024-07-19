const mongoose = require("mongoose");
const daysSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  Birthdate: String,
});
module.exports = mongoose.model("birthdates", daysSchema);
