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

const updateProfileValidator = [
  body("fullName")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("FullName must be 3-50 characters"),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

  validate,
];

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current Password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be atleast 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number"),

  validate,

  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password do not match");
      }
      return true;
    }),
  validate,
];

module.exports = { updateProfileValidator, changePasswordValidator };
