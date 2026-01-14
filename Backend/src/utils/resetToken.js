const crypto = require("crypto");

function generateResetPasswordToken(expiryMinutes) {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const expiry = Date.now() + expiryMinutes * 60 * 1000;

  return { token, hashedToken, expiry };
}

module.exports = { generateResetPasswordToken };
