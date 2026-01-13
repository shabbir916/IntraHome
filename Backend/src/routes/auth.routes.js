const express = require("express");

const { registerUser } = require("../controllers/auth.controller");
const {
  registerValidator,
} = require("../middleware/userValidator.middleware");

const router = express.Router();

router.post("/register", registerValidator, registerUser);

module.exports = router;
