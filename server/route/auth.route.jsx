const express = require("express");
const authController = require("../controller/auth.controller.jsx");
const { setAuthCookie, verifyToken } = require("../auth/auth.service.jsx");

const authRoute = express.Router();

authRoute
  .post("/signin", async (req, res) => {
    try {
      let result = await authController.signin(req.body);
      setAuthCookie(res, result);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .post("/signout", async (req, res) => {
    try {
      const user = await verifyToken(req?.headers?.authorization);
      let result = await authController.signout(user);
      res.clearCookie("user");
      res.clearCookie("token");
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = authRoute;
