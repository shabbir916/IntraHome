const express = require("express");

const { registerUser,loginUser,logoutUser,forgetPassword } = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/userValidator.middleware");

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login",loginValidator,loginUser)
router.post("/logout",logoutUser)
router.post("/forgetPassword",forgetPassword)

module.exports = router;
