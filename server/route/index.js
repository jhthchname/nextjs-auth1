import express from "express";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import typeFormRoute from "./typeform.route.js";
import formRoute from "./form.route.js";

const baseRoute = express.Router();

baseRoute.use("/api/user", userRoute);
baseRoute.use("/api/auth", authRoute);
baseRoute.use("/api/type-form", typeFormRoute);
baseRoute.use("/api/form", formRoute);

export default baseRoute;
