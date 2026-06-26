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

// ======================
// PUBLIC ROUTES
// ======================

router.post("/register", register);
router.post("/login", login);

// ======================
// GOOGLE LOGIN
// ======================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// ======================
// GOOGLE CALLBACK
// ======================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),

  (req, res) => {
    try {
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
        `${process.env.CLIENT_URL}/auth-success?token=${token}`
      );

    } catch (error) {
      console.error(error);

      res.redirect(
        `${process.env.CLIENT_URL}/login`
      );
    }
  }
);

// ======================
// PROTECTED ROUTES
// ======================

router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;
