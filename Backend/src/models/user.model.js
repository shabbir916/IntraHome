const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const userSchema = new moongose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      trype: String,
      enum: ["USER", "ADMIN"],
    },
    otp: {
      type: String,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiry: {
      type: Date,
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: { type: String, default: null },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isLoginAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user",userSchema);
