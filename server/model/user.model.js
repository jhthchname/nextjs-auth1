import mongoose from "mongoose";

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
  phone: {
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

export default mongoose.model("users", UserSchema);
