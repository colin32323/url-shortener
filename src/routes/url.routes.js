import express from "express";
import {
    createShortUrl,
    redirectToOriginal,
    listUserUrls,
} from "../controllers/url.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/shorten", authMiddleware, createShortUrl);
router.get("/:code", redirectToOriginal);
router.get("/user/urls", authMiddleware, listUserUrls);

export default router;
