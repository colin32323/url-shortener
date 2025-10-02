import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectDB } from "./config/db.js";
import mainRouter from "./routes.js";
import { handleError } from "./middlewares/handle-error.js";
import { redirectToOriginal } from "./controllers/url.controller.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// DB connection
connectDB();

// Routes
app.use("/api/v1", mainRouter);
app.get(
    "/:code",
    (_req, _res, next) => {
        console.log("Hit");
        next();
    },
    redirectToOriginal,
);

// Error handler
app.use(handleError);

export default app;
