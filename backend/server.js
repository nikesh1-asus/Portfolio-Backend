const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const moment = require("moment-timezone");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// 🔐 Security
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
}));
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

const PORT = process.env.PORT || 5000;

// ENV
const MONGO_URI = process.env.MONGO_URI?.trim();
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET?.trim();
const ADMIN_KEY = process.env.ADMIN_KEY?.trim();

// Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  ip: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// DB Connect
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in backend/.env");
  process.exit(1);
}

if (!RECAPTCHA_SECRET) {
  console.error("❌ Missing RECAPTCHA_SECRET in backend/.env");
  process.exit(1);
}

if (!ADMIN_KEY) {
  console.error("❌ Missing ADMIN_KEY in backend/.env");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.log("❌ DB Error:", err);
    process.exit(1);
  });

// Contact API
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message, captchaValue } = req.body;

  if (!captchaValue) {
    return res.status(400).json({ success: false, message: "Captcha required" });
  }

  try {
    const verify = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captchaValue}`
    );

    if (!verify.data.success) {
      return res.status(400).json({ success: false, message: "Captcha failed" });
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
    console.table({ name, email, subject, message, ip });

    res.json({ success: true, message: "Saved successfully" });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin API
app.get("/api/admin/messages", async (req, res) => {
  const adminKey = req.headers["x-admin-key"];

  if (adminKey !== ADMIN_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
