import express from "express";
import dotenv from "dotenv/config";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/url.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { handleError } from "./middlewares/handle-error.js";

const app = express();
app.use(express.json());

await connectDB();

// Routes
app.use("/api/url", urlRoutes);
app.use("/api/auth", authRoutes);

// Error handler
app.use(handleError);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
