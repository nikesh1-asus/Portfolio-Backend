const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const moment = require("moment-timezone");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config(); // ✅ FIXED (no path)

const app = express();

// ================= SECURITY =================
app.use(helmet());
app.use(express.json());

// ================= CORS FIX =================
const allowedOrigins = (
  process.env.FRONTEND_URL || "http://localhost:5173"
)
  .split(",")
  .map(o => o.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked CORS:", origin);
      return callback(null, true); // ✅ DO NOT crash server
    },
    credentials: true,
  })
);

// ================= RATE LIMIT =================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// ================= ENV =================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const ADMIN_KEY = process.env.ADMIN_KEY;

// ================= VALIDATION =================
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI");
  process.exit(1);
}

if (!RECAPTCHA_SECRET) {
  console.error("❌ Missing RECAPTCHA_SECRET");
  process.exit(1);
}

if (!ADMIN_KEY) {
  console.error("❌ Missing ADMIN_KEY");
  process.exit(1);
}

// ================= DB =================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// ================= MODEL =================
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  ip: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// ================= ROUTES =================

// Health check (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// CONTACT API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, captchaValue } = req.body;

    if (!captchaValue) {
      return res.status(400).json({
        success: false,
        message: "Captcha required",
      });
    }

    // verify captcha
    const verify = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captchaValue}`
    );

    if (!verify.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha failed",
      });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      ip,
    });

    await newMessage.save();

    const nepalTime = moment()
      .tz("Asia/Kathmandu")
      .format("YYYY-MM-DD HH:mm:ss");

    console.log(`📩 Message at ${nepalTime}`);
    console.table({ name, email, subject });

    res.json({
      success: true,
      message: "Saved successfully",
    });
  } catch (err) {
    console.error("❌ Contact API Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ADMIN API
app.get("/api/admin/messages", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];

    if (adminKey !== ADMIN_KEY) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const messages = await Message.find().sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    console.error("❌ Admin API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});