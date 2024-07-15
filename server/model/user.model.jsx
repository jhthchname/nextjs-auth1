const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  verify: {
    status: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("users", UserSchema);
