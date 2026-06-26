require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/meessageRoutes");

const app = express();

// ===============================
// Connect to MongoDB
// ===============================
connectDB();

// ===============================
// Middlewares
// ===============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
require("./config/passport");

// ===============================
// API Routes
// ===============================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Project Routes
app.use("/api/projects", projectRoutes);

// Message Routes
app.use("/api/messages", messageRoutes);

app.use(passport.initialize());

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Welcome to ProjectHub API",
    version: "1.0.0",
  });
});

// ===============================
// 404 Route
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});