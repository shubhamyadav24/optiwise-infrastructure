require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");


// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const clientLogoRoutes = require("./routes/clientLogos");


// ==========================================
// APP
// ==========================================

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// CORS
// ==========================================

const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
  })
);
// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());


// ==========================================
// STATIC UPLOADS
// ==========================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});


// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use(
  "/api/auth",
  authRoutes
);


// Projects
app.use(
  "/api/projects",
  projectRoutes
);


// Clients / Testimonials
app.use(
  "/api/clients",
  clientRoutes
);


// Contact / Enquiries
app.use(
  "/api/contact",
  contactRoutes
);


// General image upload
app.use(
  "/api/upload",
  uploadRoutes
);


// ==========================================
// CLIENT LOGOS
// ==========================================

app.use(
  "/api/client-logos",
  clientLogoRoutes
);


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});


// ==========================================
// CENTRAL ERROR HANDLER
// ==========================================

app.use(
  (err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(err.status || 500).json({
      message:
        err.message ||
        "Something went wrong.",
    });
  }
);


// ==========================================
// START SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Optiwise API running on port ${PORT}`
    );
  }
);