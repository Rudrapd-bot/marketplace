const express = require("express");
const cors = require("cors");
require("dotenv").config();
const serviceRoutes = require("./routes/serviceRoutes");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

// Connect Database
connectDB();
app.use("/api/services", serviceRoutes);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Vendor Marketplace API");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});