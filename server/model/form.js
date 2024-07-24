import mongoose, { Schema } from "mongoose";

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.ObjectId,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  approveOn: {
    type: Date,
  },
  approveBy: {
    type: Schema.ObjectId,
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },
  updatedBy: {
    type: Schema.ObjectId,
  },
  createdBy: {
    type: Schema.ObjectId,
  },
});

export default mongoose.model("forms", FormSchema);
