const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function fetchUserProfile(req, res) {
  try {
    const userId = req.user?._id;

    const userProfile = await userModel.findById(userId).select("-password");

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching user-profile",
    });
  }
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.user?._id;
    const updates = req.body;

    const allowedFields = ["fullName", "email"];
    const invalidFields = Object.keys(updates).filter(
      (key) => !allowedFields.includes(key),
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid filed(s):${invalidFields.join(",")}`,
      });
    }

    const updatedProfile = await userModel
      .findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
      )
      .select("-password");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("profile update error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user profile",
    });
  }
}

async function changePassword(req, res) {
  try {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(userId).select("+password");
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current Password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while changing user password",
    });
  }
}

async function deleteUserAccount(req, res) {
  try {
    const userId = req.user?._id;

    await userModel.findByIdAndDelete(userId);

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User account deleted Successfully",
    });
  } catch (error) {
    console.error("Account deletion error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting user account",
    });
  }
}

async function updateAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar image is required",
      });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    await userModel.findByIdAndUpdate(req.user._id, {
      avatar: avatarPath,
    });

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      avatar: avatarPath,
    });
  } catch (error) {
    console.error("Update Avatar Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating avatar",
    });
  }
}

module.exports = {
  fetchUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  updateAvatar,
};
