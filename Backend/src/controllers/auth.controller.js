const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sedEmail");
const { welcomeEmail, resetPasswordEmail } = require("../emails/index");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const OTP_EXPIRY_MINUTES = process.env.OTP_EXPIRY_MINUTES || 5;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("token", token, cookieOptions);

    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to IntraHome",
        html: welcomeEmail({ name: user.fullName }),
      });
    } catch (emailError) {
      console.error("Welcome Email Failed:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Registration error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while Registering user",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while logging-in User",
    });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User Logged-Out Successfully",
    });
  } catch (error) {
    console.error("LogOut error", error);

    return res.status(500).json({
      success: false,
      message: "Server error while Logging-Out",
    });
  }
}

async function forgetPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        mesaage: "No user found with this email",
      });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "IntraHome — Password Reset OTP",
      html: resetPasswordEmail({
        name: user.fullName,
        otp,
        expiresIn: OTP_EXPIRY_MINUTES,
      }),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent Successfully on your email",
    });
  } catch (error) {
    console.error("Forget Password Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sendiong OTP",
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, forgetPassword };
