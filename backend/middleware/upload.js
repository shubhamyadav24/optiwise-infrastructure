const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Make sure the folder exists before EVERY upload
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });

      console.log("Upload directory:", uploadDir);

      cb(null, uploadDir);
    } catch (error) {
      console.error("UPLOAD DIRECTORY ERROR:", error);
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const safeName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;

    console.log("Saving file as:", safeName);

    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
  ];

  const ext = path
    .extname(file.originalname)
    .toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files (jpg, png, webp, gif) are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

module.exports = upload;