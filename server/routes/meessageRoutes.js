const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");

// Public
router.post("/", sendMessage);

// Private
router.get("/", protect, getMessages);

router.delete("/:id", protect, deleteMessage);

module.exports = router;