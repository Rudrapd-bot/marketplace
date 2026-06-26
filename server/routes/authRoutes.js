
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// =====================
// Public Routes
// =====================

router.post("/register", register);
router.post("/login", login);

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback
router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
  }),

  (req, res) => {

    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(
      `http://localhost:3000/auth-success?token=${token}`
    );
  }
);

// =====================
// Protected Routes
// =====================

router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;

