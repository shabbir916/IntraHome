const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateHashedOTP } = require("../utils/generateOTP");
const crypto = require("crypto"); 
const sendEmail = require("../utils/sedEmail");
const { welcomeEmail, resetPasswordEmail } = require("../emails/index");
const { generateResetPasswordToken } = require("../utils/resetToken");

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

    const { otp, hashedOTP, otpExpiry } = await generateHashedOTP(
      OTP_EXPIRY_MINUTES
    );

    user.otp = hashedOTP;
    user.otpExpiry = otpExpiry;

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

async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const isOTPValid = await bcrypt.compare(otp, user.otp);
    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    // OTP verified → generate reset token
    const { token, hashedToken, expiry } = generateResetPasswordToken(10); // 10 min validity

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = expiry;

    // OTP invalidate
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken: token, // frontend ke liye
    });
  } catch (error) {
    console.error("Verify OTP Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while verifying OTP",
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // reset token invalidate
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset Password Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  verifyOTP,
  resetPassword,
};
