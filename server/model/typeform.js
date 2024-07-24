import mongoose, { Schema } from "mongoose";

const TypeSchema = new mongoose.Schema({
  name: {
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
  updatedBy: {
    type: Schema.ObjectId,
  },
  createdBy: {
    type: Schema.ObjectId,
  },
});

export default mongoose.model("typeforms", TypeSchema);
