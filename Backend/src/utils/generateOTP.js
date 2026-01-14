const crypto = require("crypto");
const bcrypt = require("bcryptjs");

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

async function generateHashedOTP(expiryMinutes) {
  const otp = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, 10);
  const otpExpiry = Date.now() + expiryMinutes * 60 * 1000;

  return { otp, hashedOTP, otpExpiry };
}

module.exports = { generateOTP, generateHashedOTP };
