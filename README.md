# 🚀 Portfolio Backend API - Nikesh Ojha

This is the backend service for my personal portfolio website.  
It is built with **Node.js, Express, MongoDB, and Google reCAPTCHA verification**.

It handles contact form submissions, stores messages securely, and provides admin APIs.

---

## 🌐 Live Backend URL

https://portfolio-backend-j9vw.onrender.com


## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Security
- Helmet (security headers)
- CORS (cross-origin control)
- express-rate-limit (rate limiting)
- Google reCAPTCHA verification

### Tools
- Axios
- Moment Timezone
- dotenv

---

## 📁 Project Structure

server.js  
models/  
.env  
package.json  

---

## ⚙️ Features

- 📩 Contact form API
- 🔐 Google reCAPTCHA verification
- 🗄 Store messages in MongoDB
- 🛡 Security middleware (Helmet, Rate Limit)
- 🌍 CORS protection
- ⏱ Nepal timezone logging
- 🔑 Admin messages API (secured)

---

## 📡 API Endpoints

---

### 🔹 Health Check

🔐 Environment Variables

Create a .env file:


MONGO_URI=your_mongodb_connection_string

RECAPTCHA_SECRET=your_google_recaptcha_secret

ADMIN_KEY=your_admin_secret_key

FRONTEND_URL= (Your Name..)-domain.com

PORT=5000
