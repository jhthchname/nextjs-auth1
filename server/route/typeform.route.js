import express from "express";
import typeFormController from "../controller/typeform.controller.js";
import { verifyToken } from "../auth/auth.service.js";

const typeForm = express.Router();

typeForm
  .get("/", async (req, res) => {
    try {
      await verifyToken(req?.headers?.authorization);
      let newUser = await typeFormController.typeForms(req.query);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  //   .get("/:id", async (req, res) => {
  //     try {
  //       console.log("req id========>", req.params);
  //       let newUser = await userController.user(req.params);
  //       res.status(200).json(newUser);
  //     } catch (error) {
  //       res.status(400).json({ message: error?.message });
  //     }
  //   })
  .post("/create", async (req, res) => {
    try {
      console.log("req?.body=========>", req?.body);
      const user = await verifyToken(req?.headers?.authorization);
      let result = await typeFormController.create(req?.body, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .put("/update", async (req, res) => {
    try {
      const user = await verifyToken(req?.headers?.authorization);
      let result = await typeFormController.update(req?.body, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      await verifyToken(req?.headers?.authorization);
      let result = await typeFormController.delete(req?.params);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  });

export default typeForm;
