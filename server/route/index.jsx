const express = require("express")
const userRoute = require("./user.route.jsx")
const authRoute = require("./auth.route.jsx")

const baseRoute = express.Router()

baseRoute.use("/api/user", userRoute)
baseRoute.use("/api/auth", authRoute)

module.exports = baseRoute