import express from "express";
import cors from "cors";

import importRoutes from "./routes/importRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "GrowEasy AI CSV Importer Backend is running 🚀",
  });
});

// Import Routes
app.use("/api/backend", importRoutes);

export default app;