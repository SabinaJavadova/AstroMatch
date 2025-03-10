const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  zodiacSign: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
const userModel = mongoose.model("User", userSchema); 
module.exports = userModel;
