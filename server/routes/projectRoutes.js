const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createProject,
  getProjects,
  getMyProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// ==========================
// Public Routes
// ==========================

// Get all projects
router.get("/", getProjects);

// Get logged-in user's projects
router.get("/my", protect, getMyProjects);

// Get single project
router.get("/:id", getProject);

// ==========================
// Protected Routes
// ==========================

// Create project
router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);

// Update project
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProject
);

// Delete project
router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;