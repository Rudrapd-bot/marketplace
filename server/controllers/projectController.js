const Project = require("../models/Project");

// =====================================
// Create Project
// =====================================
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      techStack,
      githubLink,
      liveDemo,
    } = req.body;

    const project = await Project.create({
      user: req.user.id,
      title,
      shortDescription,
      description,
      techStack: techStack
        ? techStack.split(",").map((tech) => tech.trim())
        : [],
      githubLink,
      liveDemo,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get All Projects
// =====================================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("user", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Logged-in User Projects
// =====================================
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Single Project
// =====================================
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "user",
      "name email bio github linkedin profileImage"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Update Project
// =====================================
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      title,
      shortDescription,
      description,
      techStack,
      githubLink,
      liveDemo,
    } = req.body;

    project.title = title || project.title;
    project.shortDescription =
      shortDescription || project.shortDescription;
    project.description = description || project.description;
    project.githubLink = githubLink || project.githubLink;
    project.liveDemo = liveDemo || project.liveDemo;

    if (techStack) {
      project.techStack = techStack
        .split(",")
        .map((tech) => tech.trim());
    }

    if (req.file) {
      project.image = req.file.filename;
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Delete Project
// =====================================
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};