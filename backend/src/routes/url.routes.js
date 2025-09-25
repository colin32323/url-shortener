import express from "express";
import * as Controller from "../controllers/url.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/shorten", authMiddleware, Controller.createShortUrl);
router.get("/:code", Controller.redirectToOriginal);
router.get("/user/urls", authMiddleware, Controller.listUserUrls);

export default router;
