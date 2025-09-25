import express from "express";
import * as Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

export default router;
