import express from "express"
import userRoute from "./user.route.js"
import authRoute from "./auth.route.js"

const baseRoute = express.Router()

baseRoute.use("/api/user", userRoute)
baseRoute.use("/api/auth", authRoute)

export default baseRoute