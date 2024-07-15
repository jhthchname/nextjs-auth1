const express = require("express")
const { verifyToken } = require("../auth/auth.service.jsx")
const userController = require("../controller/user.controller.jsx")

const userRoute = express.Router()

userRoute
    .get("/", async (req, res) => {
        try {
            await verifyToken(req?.headers?.authorization)
            let newUser = await userController.users(req.query)
            res.status(200).json(newUser)
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    })
    .post("/create", async (req, res) => {
        try {
            console.log('req?.body=========>', req?.body)
            // await verifyToken(req?.headers?.authorization)
            let result = await userController.create(req?.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    })
    .put("/update", async (req, res) => {
        try {
            await verifyToken(req?.headers?.authorization)
            let result = await userController.update(req?.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    })
    .post("/check-token", async (req, res) => {
        try {
            const user = await verifyToken(req?.headers?.authorization)
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            await verifyToken(req?.headers?.authorization)
            let result = await userController.delete(req?.params)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error?.message })
        }
    })

module.exports = userRoute
