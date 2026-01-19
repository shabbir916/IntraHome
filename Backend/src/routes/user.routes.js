const express = require("express");
const authUser = require("../middleware/auth.middleware");

const {
  fetchUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  updateAvatar
} = require("../controllers/user.controller");
const {
  updateProfileValidator,
  changePasswordValidator
} = require("../middleware/userValidator.middleware");
const uploadAvatar = require("../config/multer");

const router = express.Router();

router.get("/user-profile", authUser, fetchUserProfile);
router.patch(
  "/update-profile",
  authUser,
  updateProfileValidator,
  updateUserProfile,
);
router.patch("/change-password",authUser,changePasswordValidator,changePassword)
router.delete("/delete-account",authUser,deleteUserAccount)
router.patch("/update-avatar",authUser,uploadAvatar.single("avatar"),updateAvatar)

module.exports = router;
