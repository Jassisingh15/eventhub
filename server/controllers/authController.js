const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/email");

// Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * =========================
 * REGISTER USER
 * =========================
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    // Generate OTP
    const otp = generateOTP();

    // Save OTP in DB
    await OTP.create({
      email,
      otp,
      action: "account_verification",
    });

    // 🔥 IMPORTANT FIX: DO NOT WAIT FOR EMAIL
    sendOTPEmail(email, otp, "account_verification")
      .then(() => console.log("OTP email sent"))
      .catch((err) => console.log("Email error:", err));

    // Send response immediately
    return res.status(201).json({
      message: "OTP sent to email. Please verify.",
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * LOGIN USER
 * =========================
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If not verified, send OTP again
    if (!user.isVerified && user.role !== "admin") {
      const otp = generateOTP();

      await OTP.findOneAndDelete({
        email: user.email,
        action: "account_verification",
      });

      await OTP.create({
        email: user.email,
        otp,
        action: "account_verification",
      });

      sendOTPEmail(user.email, otp, "account_verification").catch((err) =>
        console.log("Email error:", err),
      );

      return res.status(403).json({
        message: "Account not verified",
        needsVerification: true,
        email: user.email,
      });
    }

    // Generate token
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * VERIFY OTP
 * =========================
 */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validOTP = await OTP.findOne({
      email,
      otp,
      action: "account_verification",
    });

    if (!validOTP) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // Mark user verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    );

    // Delete OTP after use
    await OTP.deleteOne({ _id: validOTP._id });

    // Generate token
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
