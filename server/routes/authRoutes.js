const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;