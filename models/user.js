const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  devType: { type: String, required: true },
  lastLogin: { type: String, required: true },
  display: { type: Boolean, default: false },
  userType: { type: String },
  phoneNumber: { type: String },
  skills: { type: [String] },
  color: { type: String },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
