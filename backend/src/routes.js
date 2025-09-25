import express from "express";

import authRouter from "./routes/auth.routes.js";
import urlRouter from "./routes/url.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/url", urlRouter);

export default router;
