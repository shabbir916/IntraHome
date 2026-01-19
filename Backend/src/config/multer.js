const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/avatars",
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files are allowed"), false);
  } else {
    cb(null, true);
  }
};

const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, 
});

module.exports = uploadAvatar;
