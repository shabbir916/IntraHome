const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
  forgetPasswordValidator,
  verifyEmailOtpValidator,
  resetPasswordValidator,
} = require("../middleware/userValidator.middleware");

const authLimiter = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/register", authLimiter, registerValidator, registerUser);
router.post("/login", authLimiter, loginValidator, loginUser);
router.post("/logout", logoutUser);
router.post(
  "/forgetPassword",
  authLimiter,forgetPasswordValidator,
  forgetPassword
);
router.post("/verifyOTP", authLimiter, verifyEmailOtpValidator, verifyOTP);
router.post(
  "/resetPassword",
  authLimiter,
  resetPasswordValidator,
  resetPassword
);

module.exports = router;
