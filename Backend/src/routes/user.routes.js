const express = require("express");
const authUser = require("../middleware/rateLimiter");

const router = express.Router();


module.exports = router;