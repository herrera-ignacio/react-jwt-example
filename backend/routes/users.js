import express from "express";
import db from "../model/db.js";
import * as registerController from "../controllers/registerController.js";

const router = express.Router();

router.get('/', (_req, res) => {
  const { users } = db.data;
  res.status(200).send({ users });
});

router.post('/', registerController.handleNewUser)

export default router;
