const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= Register =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ================= Login =================
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ================= Get Profile =================
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ================= Update Profile =================
exports.updateProfile = async (req, res) => {

  try {

    const { bio, github, linkedin } = req.body;

    const updatedData = {
      bio,
      github,
      linkedin,
    };

    if (req.file) {
      updatedData.profileImage = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};