import mongoose from "mongoose";
import { MONGO_URL, MONGO_USER, MONGO_PASS } from "./settings.js";

// help to debug mongoose
if (process.env.NODE_ENV !== "test") {
  mongoose.set("debug", false);
}

if (MONGO_USER && MONGO_PASS && process.env.NODE_ENV === "production") {
  config = {
    ...config,
    auth: {
      authSource: "admin",
    },
    user: MONGO_USER,
    pass: MONGO_PASS,
  };
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });

export default mongoose
