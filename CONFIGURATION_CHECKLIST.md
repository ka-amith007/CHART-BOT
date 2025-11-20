# ✅ Configuration Checklist - CHATBOT Professional Auth

## 📋 Before Starting Your Server

Use this checklist to ensure everything is configured correctly.

---

## 🔴 CRITICAL - Required to Run

### ✅ OpenAI API Key
- [x] Already configured in `.env`
- Value: `your_api_key_here`
- Status: ✅ **READY**

### ⚠️ MongoDB Database
- [ ] **YOU NEED TO CONFIGURE THIS**
- Current: `mongodb://localhost:27017/chatbot`
- Options:
  - **MongoDB Atlas (Cloud):** https://www.mongodb.com/cloud/atlas
  - **Local MongoDB:** Install from mongodb.com
- Update in `.env`: `MONGODB_URI=your_connection_string`
- Status: 🔴 **NOT CONFIGURED**

### ⚠️ JWT Secret
- [ ] **YOU NEED TO GENERATE THIS**
- Generate with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- Update in `.env`: `JWT_SECRET=generated_secret`
- Status: 🔴 **NOT CONFIGURED**

### ⚠️ Session Secret
- [ ] **YOU NEED TO GENERATE THIS**
- Generate with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- Update in `.env`: `SESSION_SECRET=generated_secret`
- Status: 🔴 **NOT CONFIGURED**

### ⚠️ Gmail SMTP (for OTP emails)
- [ ] **YOU NEED TO CONFIGURE THIS**
- Steps:
  1. Enable 2-Step Verification: https://myaccount.google.com/security
  2. Generate App Password: https://myaccount.google.com/apppasswords
  3. Select "Mail" → Copy 16-character password
- Update in `.env`:
  ```env
  EMAIL_USER=your.email@gmail.com
  EMAIL_PASSWORD=abcdefghijklmnop
  ```
- Status: 🔴 **NOT CONFIGURED**

---

## 🟡 OPTIONAL - For OAuth Login

### Google OAuth (Optional)
- [ ] Configure if you want Google login
- Setup: https://console.cloud.google.com/apis/credentials
- Create OAuth Client ID
- Add redirect URI: `http://localhost:3001/auth/google/callback`
- Update in `.env`:
  ```env
  GOOGLE_CLIENT_ID=your_client_id
  GOOGLE_CLIENT_SECRET=your_client_secret
  ```
- Status: 🟡 **OPTIONAL**

### Facebook OAuth (Optional)
- [ ] Configure if you want Facebook login
- Setup: https://developers.facebook.com/apps/
- Create app + Add Facebook Login
- Add redirect URI: `http://localhost:3001/auth/facebook/callback`
- Update in `.env`:
  ```env
  FACEBOOK_APP_ID=your_app_id
  FACEBOOK_APP_SECRET=your_app_secret
  ```
- Status: 🟡 **OPTIONAL**

### GitHub OAuth (Optional)
- [ ] Configure if you want GitHub login
- Setup: https://github.com/settings/developers
- New OAuth App
- Callback URL: `http://localhost:3001/auth/github/callback`
- Update in `.env`:
  ```env
  GITHUB_CLIENT_ID=your_client_id
  GITHUB_CLIENT_SECRET=your_client_secret
  ```
- Status: 🟡 **OPTIONAL**

---

## 📝 Your .env File Should Look Like This

```env
# ================================
# OpenAI Configuration
# ================================
OPENAI_API_KEY=your_openai_api_key_here

# ================================
# Server Configuration
# ================================
PORT=3001
NODE_ENV=development

# ================================
# Database Configuration (🔴 CONFIGURE THIS)
# ================================
MONGODB_URI=your_mongodb_connection_string_here

# ================================
# JWT & Session Configuration (🔴 GENERATE THESE)
# ================================
JWT_SECRET=your_generated_jwt_secret_here
SESSION_SECRET=your_generated_session_secret_here

# ================================
# Email Configuration (🔴 CONFIGURE THIS)
# ================================
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password_here

# ================================
# Google OAuth Configuration (🟡 OPTIONAL)
# ================================
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ================================
# Facebook OAuth Configuration (🟡 OPTIONAL)
# ================================
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# ================================
# GitHub OAuth Configuration (🟡 OPTIONAL)
# ================================
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🚀 After Configuration

### 1. Start Server
```powershell
npm start
```

### 2. Check Server Output

**✅ Good (All configured):**
```
🚀 Amith Professional Auth System & Chatbot running on port 3001
📝 Chat endpoint: http://localhost:3001/chat
🔐 Auth endpoints: http://localhost:3001/auth/*
🌐 Open login.html in your browser to start
✅ MongoDB connected successfully
```

**⚠️ Warnings (Missing configuration):**
```
⚠️  WARNING: MongoDB URI not configured!
⚠️  WARNING: Email credentials not configured!
⚠️  WARNING: OAuth credentials missing for: Google, Facebook, GitHub
```

### 3. Test Authentication

**Open Browser:**
- URL: `http://localhost:3001/login.html`

**Test Email OTP Login:**
1. Enter name and email
2. Click "Send OTP"
3. Check email for code
4. Enter OTP
5. Click "Verify & Login"
6. Should redirect to chat

**Test OAuth Login (if configured):**
- Click Google/Facebook/GitHub button
- Authorize app
- Should redirect to chat

---

## 🔍 Quick Troubleshooting

### Server won't start
```
❌ Error: Cannot find module 'mongoose'
✅ Fix: npm install
```

### MongoDB connection failed
```
❌ Error: ECONNREFUSED ::1:27017
✅ Fix: Install MongoDB or use Atlas
       Update MONGODB_URI in .env
       Restart server
```

### OTP email not sent
```
❌ Error: Invalid login: 535-5.7.8
✅ Fix: Use Gmail App Password
       Enable 2-Step Verification
       Remove spaces from password
       Restart server
```

### OAuth redirect error
```
❌ Error: redirect_uri_mismatch
✅ Fix: Check callback URL matches exactly
       Add credentials to .env
       Restart server
```

---

## 📊 Configuration Progress

Track your setup progress:

```
┌─────────────────────────────────────┐
│ Configuration Status                │
├─────────────────────────────────────┤
│ ✅ OpenAI API Key      [DONE]       │
│ ✅ Node.js Packages    [INSTALLED]  │
│ 🔴 MongoDB URI         [TODO]       │
│ 🔴 JWT Secret          [TODO]       │
│ 🔴 Session Secret      [TODO]       │
│ 🔴 Gmail SMTP          [TODO]       │
│ 🟡 Google OAuth        [OPTIONAL]   │
│ 🟡 Facebook OAuth      [OPTIONAL]   │
│ 🟡 GitHub OAuth        [OPTIONAL]   │
└─────────────────────────────────────┘

Status Legend:
✅ = Ready to use
🔴 = Required - must configure
🟡 = Optional - nice to have
```

---

## ⏱️ Estimated Setup Time

| Task | Time | Status |
|------|------|--------|
| MongoDB Setup | 2 min | 🔴 TODO |
| Gmail SMTP Setup | 3 min | 🔴 TODO |
| Generate Secrets | 1 min | 🔴 TODO |
| Update .env | 1 min | 🔴 TODO |
| **Total Required** | **7 min** | 🔴 TODO |
| Google OAuth | 5 min | 🟡 Optional |
| Facebook OAuth | 5 min | 🟡 Optional |
| GitHub OAuth | 5 min | 🟡 Optional |

---

## 🎯 Next Steps

1. [ ] **Configure MongoDB** (Step 1 - 2 min)
2. [ ] **Set up Gmail SMTP** (Step 2 - 3 min)
3. [ ] **Generate secrets** (Step 3 - 1 min)
4. [ ] **Update .env file** (Step 4 - 1 min)
5. [ ] **Start server:** `npm start`
6. [ ] **Test OTP login**
7. [ ] **(Optional) Configure OAuth**
8. [ ] **Deploy to production**

---

## 📚 Need Help?

- **Quick Setup:** Read `QUICKSTART.md`
- **Detailed Guide:** Read `SETUP_GUIDE.md`
- **Technical Details:** Read `IMPLEMENTATION_SUMMARY.md`

---

## 🎉 When All Configured

You'll have a **production-ready chatbot** with:

✅ Real email OTP verification  
✅ Secure JWT authentication  
✅ MongoDB user storage  
✅ Professional UI  
✅ OAuth social login (optional)  

**Ready to launch in just 7 minutes!** 🚀

---

**Print this checklist and check off items as you configure them!** ✅
