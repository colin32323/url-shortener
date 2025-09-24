import express from "express";
import dotenv from "dotenv/config";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { handleError } from "./middlewares/handle-error.js";

const app = express();

app.use(express.json());

// Morgan HTTP request logging
app.use(morgan("dev"));

// Routes
app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

// Error handler
app.use(handleError);

export default app;
