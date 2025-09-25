import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import mainRouter from "./routes.js";
import { handleError } from "./middlewares/handle-error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
connectDB();

// Morgan HTTP request logging
app.use(morgan("dev"));

// Routes
app.use("/api/v1", mainRouter);

// Error handler
app.use(handleError);

export default app;
