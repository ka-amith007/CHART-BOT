# 🎉 CHATBOT - Professional Authentication System

## ✅ What You Have

A **production-ready AI chatbot** with **enterprise-level authentication**!

### 🔐 Authentication Features:
- ✅ **Real OTP Email Verification** (6-digit codes, 10-min expiry)
- ✅ **Google OAuth Login**
- ✅ **Facebook OAuth Login**
- ✅ **GitHub OAuth Login**
- ✅ **JWT Token Sessions** (7-day secure tokens)
- ✅ **MongoDB Database** (User & OTP storage)
- ✅ **Welcome Emails** (Professional HTML templates)
- ✅ **ChatGPT-Style UI** (Modern, professional design)

### 🚫 No Dummy/Fake Authentication:
- ❌ No hardcoded passwords
- ❌ No fake OTP codes
- ❌ No localStorage-only auth
- ❌ No static user lists

**This is 100% REAL, PRODUCTION-READY!** 🔥

---

## 🚀 Quick Start (10 Minutes)

### Step 1: MongoDB (2 minutes)

**Option A - MongoDB Atlas (Cloud, FREE):**
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account + cluster
3. Get connection string
4. Add to .env: MONGODB_URI=mongodb+srv://...
```

**Option B - Local MongoDB:**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# After installation:
Start-Service -Name MongoDB
# Add to .env: MONGODB_URI=mongodb://localhost:27017/chatbot
```

---

### Step 2: Gmail SMTP (3 minutes)

```
1. Enable 2-Step Verification:
   https://myaccount.google.com/security

2. Generate App Password:
   https://myaccount.google.com/apppasswords
   → Select "Mail" → Copy 16-char password

3. Update .env:
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop  (no spaces)
```

---

### Step 3: Generate Secrets (1 minute)

```powershell
# Run these in PowerShell:
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Copy outputs to .env file
```

---

### Step 4: Start Server

```powershell
npm start
```

Then open: **http://localhost:3001/login.html**

---

## 📧 Test Authentication

### Email OTP Login:
1. Enter name and email
2. Click "Send OTP"
3. Check email for 6-digit code
4. Enter OTP and verify
5. Start chatting! 🎉

### OAuth Login (Optional):
- Click Google/Facebook/GitHub button
- Authorize → Auto-login
- Start chatting! 🎉

---

## 📋 Environment Variables

Your `.env` file needs these values:

```env
# ===== REQUIRED =====
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001

# ===== REQUIRED FOR AUTH =====
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_jwt_secret
SESSION_SECRET=your_generated_session_secret
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# ===== OPTIONAL (OAuth) =====
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🔍 Troubleshooting

### MongoDB Connection Failed
```
Error: ECONNREFUSED ::1:27017
Fix: Install MongoDB or use Atlas, update MONGODB_URI
```

### OTP Email Not Sent
```
Error: Invalid login: 535-5.7.8
Fix: Use Gmail App Password (not regular password)
     Enable 2-Step Verification first
```

### OAuth Not Working
```
Error: redirect_uri_mismatch
Fix: Verify callback URLs:
     - Google: http://localhost:3001/auth/google/callback
     - Facebook: http://localhost:3001/auth/facebook/callback
     - GitHub: http://localhost:3001/auth/github/callback
```

---

## 📚 Documentation

- **`QUICKSTART.md`** ⚡ - Fast setup (10 minutes)
- **`SETUP_GUIDE.md`** 📚 - Detailed guide + troubleshooting
- **`IMPLEMENTATION_SUMMARY.md`** 🔧 - Technical details

---

## 🎯 Features

### Authentication:
- [x] Email OTP verification (Nodemailer + Gmail)
- [x] Google/Facebook/GitHub OAuth (Passport.js)
- [x] JWT tokens (7-day expiry)
- [x] MongoDB user storage
- [x] Welcome emails

### Chat:
- [x] AI conversations (OpenAI GPT-4o-mini)
- [x] Image upload & analysis
- [x] File upload & processing
- [x] Conversation history
- [x] Professional ChatGPT-style UI

### Security:
- [x] JWT signatures & validation
- [x] Password hashing (bcrypt)
- [x] OTP expiration (10 min)
- [x] Protected endpoints
- [x] CORS configuration

---

## 🏗️ System Architecture

```
User Browser (login.html) → JWT Token
                    ↓
         Express Server (Node.js)
              /auth/* routes
                    ↓
         ┌──────────┴──────────┐
         ↓                      ↓
    MongoDB              Gmail SMTP
  (Users, OTPs)         (OTP Emails)
         ↓
    OpenAI API
  (Chat + Vision)
```

---

## 📦 Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Passport.js (OAuth)
- Nodemailer (Email)
- JWT (jsonwebtoken)
- bcrypt (Hashing)

**Frontend:**
- HTML5/CSS3
- Vanilla JavaScript
- Fetch API
- LocalStorage (JWT)

**APIs:**
- OpenAI GPT-4o-mini
- Gmail SMTP
- Google/Facebook/GitHub OAuth

---

## 🎊 Congratulations!

You have a **production-ready authentication system** with:

🔥 Real OTP email verification  
🔥 Real OAuth social login  
🔥 Real database storage  
🔥 Real JWT tokens  
🔥 Professional UI  
🔥 No dummy/fake authentication  

**Just configure MongoDB + Gmail and you're LIVE!** 🚀

---

## 📞 Support

Check documentation files:
- `QUICKSTART.md` - Fast setup
- `SETUP_GUIDE.md` - Complete guide
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

**Built with ❤️ - Amith Professional Auth System**
