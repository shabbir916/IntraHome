const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const registerValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("FullName is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("FullName must be 3-50 characters"),

  body("email").trim().isEmail().withMessage("Invalid Email Format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),

  validate,
];

const loginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

const forgetPasswordValidator = [
  body("email").isEmail().withMessage("Valid Email is Required"),

  validate,
];

const verifyEmailOtpValidator = [
  body("email").isEmail().withMessage("Valid Email is required"),

  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ max: 6 })
    .withMessage("Invalid OTP"),

  validate,
];

const resetPassword = [
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password do not match");
    }
    return true;
  }),

  validate,
];

const updateProfileValidator = [
  body("fullName")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("FullName must be 3-50 characters"),

  body("avatar").optional.isURL().withMessage("Avatar must be a valid URL"),

  validate,
];

module.exports = {
  registerValidator,
  loginValidator,
  forgetPasswordValidator,
  verifyEmailOtpValidator,
  resetPassword,
  updateProfileValidator,
};
