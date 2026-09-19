const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ClientLogo = require("../models/ClientLogo");

const router = express.Router();


// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadDir = path.join(
  __dirname,
  "..",
  "uploads",
  "client-logos"
);


// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}


// ==========================================
// MULTER STORAGE
// ==========================================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {

    const ext = path.extname(
      file.originalname
    );

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ext;

    cb(null, filename);
  },

});


// ==========================================
// MULTER CONFIG
// ==========================================

const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: function (req, file, cb) {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (
      !allowedTypes.includes(
        file.mimetype
      )
    ) {
      return cb(
        new Error(
          "Only JPG, PNG, WEBP and SVG files are allowed."
        )
      );
    }

    cb(null, true);
  },

});


// ==========================================
// GET ALL LOGOS
// ==========================================

router.get("/", async (req, res) => {

  try {

    const logos = await ClientLogo
      .find()
      .sort({
        createdAt: -1,
      });

    res.json(logos);

  } catch (error) {

    console.error(
      "GET CLIENT LOGOS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch client logos.",
    });

  }

});


// ==========================================
// UPLOAD LOGO
// ==========================================

router.post(
  "/",
  upload.single("logo"),
  async (req, res) => {

    try {

      if (!req.body.name) {

        return res.status(400).json({
          message:
            "Client/company name is required.",
        });

      }


      if (!req.file) {

        return res.status(400).json({
          message:
            "Logo file is required.",
        });

      }


      const logoUrl =
        `/uploads/client-logos/${req.file.filename}`;


      const clientLogo =
        new ClientLogo({

          name: req.body.name.trim(),

          logo: logoUrl,

        });


      const savedLogo =
        await clientLogo.save();


      res.status(201).json(
        savedLogo
      );

    } catch (error) {

      console.error(
        "UPLOAD CLIENT LOGO ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to upload client logo.",
      });

    }

  }
);


// ==========================================
// DELETE LOGO
// ==========================================

router.delete(
  "/:id",
  async (req, res) => {

    try {

      const logo =
        await ClientLogo.findById(
          req.params.id
        );


      if (!logo) {

        return res.status(404).json({
          message:
            "Client logo not found.",
        });

      }


      // Delete physical image
      if (logo.logo) {

        const filePath =
          path.join(
            __dirname,
            "..",
            logo.logo
          );

        if (
          fs.existsSync(filePath)
        ) {
          fs.unlinkSync(filePath);
        }

      }


      await ClientLogo.findByIdAndDelete(
        req.params.id
      );


      res.json({
        message:
          "Client logo deleted successfully.",
      });

    } catch (error) {

      console.error(
        "DELETE CLIENT LOGO ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete client logo.",
      });

    }

  }
);


module.exports = router;