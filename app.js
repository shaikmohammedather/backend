import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
