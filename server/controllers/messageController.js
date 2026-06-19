const Message = require("../models/Message");
const Project = require("../models/Project");

// ===========================
// Send Message
// ===========================
exports.sendMessage = async (req, res) => {
  try {
    const { projectId, senderName, senderEmail, message } = req.body;

    if (!projectId || !senderName || !senderEmail || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const newMessage = await Message.create({
      project: projectId,
      senderName,
      senderEmail,
      message,
      receiver: project.user,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Get My Messages
// ===========================
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.user.id,
    })
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// Delete Message
// ===========================
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};