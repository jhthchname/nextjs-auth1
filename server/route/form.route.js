import express from "express";
import formController from "../controller/form.controller.js";
import { verifyToken } from "../auth/auth.service.js";

const form = express.Router();

form
  .get("/", async (req, res) => {
    try {
      await verifyToken(req?.headers?.authorization);
      let newUser = await formController.forms(req.query);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      let newUser = await formController.form(req.params);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .post("/create", async (req, res) => {
    try {
      const user = await verifyToken(req?.headers?.authorization);
      let result = await formController.create(req?.body, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .put("/update", async (req, res) => {
    try {
      const user = await verifyToken(req?.headers?.authorization);
      let result = await formController.update(req?.body, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      await verifyToken(req?.headers?.authorization);
      let result = await formController.delete(req?.params);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  });

export default form;
