# 🚀 CHATBOT - Professional Authentication System Setup Guide

## ✅ What Has Been Completed

Your professional chatbot now includes:

✅ **Complete Authentication System**
- Real OTP email verification (6-digit codes with 10-minute expiry)
- OAuth integration (Google, Facebook, GitHub)
- JWT token-based sessions (7-day validity)
- MongoDB database for user storage
- Session management with Passport.js
- Professional welcome emails after signup

✅ **Security Features**
- Password hashing with bcryptjs
- Secure JWT tokens
- OTP auto-expiration
- Email validation
- Session management
- Protected chat endpoints

✅ **Professional UI**
- Modern login page with OTP flow
- ChatGPT-style chat interface
- User profile display in header
- Smooth animations and transitions
- Responsive design

---

## 📋 Setup Instructions

### Step 1: Install MongoDB (Required)

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/chatbot`)
6. Add this to your `.env` file as `MONGODB_URI`

**Option B: Local MongoDB**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install MongoDB on your computer
3. Start MongoDB service:
   ```powershell
   # Check if MongoDB is running
   Get-Service -Name MongoDB
   
   # If not running, start it
   Start-Service -Name MongoDB
   ```
4. Your connection string will be: `mongodb://localhost:27017/chatbot`

---

### Step 2: Configure Email Service (Required for OTP)

**Gmail Setup (Recommended):**

1. **Enable 2-Step Verification:**
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password (example: `abcd efgh ijkl mnop`)

3. **Update .env file:**
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Note: Remove spaces from app password)

---

### Step 3: Configure OAuth Providers (Optional)

#### Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click "Create Credentials" → "OAuth 2.0 Client ID"
4. Configure consent screen if prompted
5. Application type: "Web application"
6. **Authorized redirect URIs:**
   ```
   http://localhost:3001/auth/google/callback
   ```
7. Copy Client ID and Client Secret to `.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

#### Facebook OAuth

1. Go to https://developers.facebook.com/apps/
2. Create a new app → "Consumer"
3. Add "Facebook Login" product
4. Settings → Basic → Copy App ID and App Secret
5. Facebook Login → Settings → Add Valid OAuth Redirect URI:
   ```
   http://localhost:3001/auth/facebook/callback
   ```
6. Update `.env`:
   ```env
   FACEBOOK_APP_ID=your_app_id_here
   FACEBOOK_APP_SECRET=your_app_secret_here
   ```

#### GitHub OAuth

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `CHATBOT`
   - Homepage URL: `http://localhost:3001`
   - Authorization callback URL: `http://localhost:3001/auth/github/callback`
4. Click "Register application"
5. Copy Client ID and generate Client Secret
6. Update `.env`:
   ```env
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   ```

---

### Step 4: Generate Secure Secrets

Run this in PowerShell to generate secure secrets:

```powershell
# Generate JWT Secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate Session Secret
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

Copy the generated values to your `.env` file.

---

### Step 5: Final .env Configuration

Your `.env` file should look like this:

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
# Database Configuration
# ================================
MONGODB_URI=mongodb://localhost:27017/chatbot
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatbot

# ================================
# JWT & Session Configuration
# ================================
JWT_SECRET=your_generated_jwt_secret_here
SESSION_SECRET=your_generated_session_secret_here

# ================================
# Email Configuration (Gmail)
# ================================
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password

# ================================
# Google OAuth Configuration (Optional)
# ================================
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ================================
# Facebook OAuth Configuration (Optional)
# ================================
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# ================================
# GitHub OAuth Configuration (Optional)
# ================================
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🎯 Running Your Application

1. **Start the server:**
   ```powershell
   npm start
   ```

2. **Open your browser:**
   - Go to: `http://localhost:3001/login-new.html`

3. **Test the authentication:**
   - **Email OTP Login:**
     1. Enter your name and email
     2. Click "Send OTP"
     3. Check your email for 6-digit code
     4. Enter OTP and click "Verify & Login"
     5. You'll be redirected to the chat interface
   
   - **OAuth Login:**
     - Click on Google/Facebook/GitHub buttons
     - Authorize the app
     - You'll be redirected to chat automatically

4. **Chat with your AI assistant:**
   - Ask questions
   - Upload images for analysis
   - Upload files for processing
   - Your conversation history is saved

---

## 🔍 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoServerError: Authentication failed`
- **Solution:** Check your MongoDB URI username and password
- Make sure to URL-encode special characters in password

**Error:** `ECONNREFUSED`
- **Solution:** Make sure MongoDB service is running
  ```powershell
  Start-Service -Name MongoDB
  ```

### Email Issues

**Error:** `Invalid login: 535-5.7.8 Username and Password not accepted`
- **Solution:** Use App Password, not your regular Gmail password
- Make sure 2-Step Verification is enabled
- Remove all spaces from the app password

**Error:** OTP email not received
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Try generating a new app password

### OAuth Issues

**Error:** `redirect_uri_mismatch`
- **Solution:** Make sure the callback URL in your OAuth app settings EXACTLY matches:
  - Google: `http://localhost:3001/auth/google/callback`
  - Facebook: `http://localhost:3001/auth/facebook/callback`
  - GitHub: `http://localhost:3001/auth/github/callback`

**Error:** OAuth provider not configured
- **Solution:** Add the client ID and secret to `.env`
- Restart the server after updating `.env`

### JWT Token Issues

**Error:** `jwt malformed` or `invalid token`
- **Solution:** User's token might be expired or corrupted
- Clear browser localStorage and login again
- Generate new JWT_SECRET if needed

---

## 📊 System Architecture

```
┌─────────────────┐
│   Frontend      │
│  (HTML/JS)      │
│  login-new.html │
│  chat.html      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐     ┌──────────────┐
│   Express       │────→│   MongoDB    │
│   Server        │     │   (Users,    │
│   (Node.js)     │     │    OTPs)     │
└────────┬────────┘     └──────────────┘
         │
         ├──→ OpenAI API (Chat + Vision)
         │
         ├──→ Gmail SMTP (OTP Emails)
         │
         └──→ OAuth Providers
              (Google, Facebook, GitHub)
```

---

## 🎨 Features

### Authentication Features
- ✅ Email + OTP verification (6-digit codes)
- ✅ Google OAuth login
- ✅ Facebook OAuth login
- ✅ GitHub OAuth login
- ✅ JWT token-based sessions (7 days)
- ✅ Secure password hashing
- ✅ OTP auto-expiration (10 minutes)
- ✅ Welcome emails for new users
- ✅ Session management

### Chat Features
- ✅ AI-powered conversations (OpenAI GPT-4o-mini)
- ✅ Image upload and analysis
- ✅ File upload and processing
- ✅ Conversation history
- ✅ Professional ChatGPT-style UI
- ✅ User profile display
- ✅ Secure logout

### Security Features
- ✅ JWT tokens with expiration
- ✅ MongoDB user storage
- ✅ Email verification required
- ✅ Protected endpoints
- ✅ Session management
- ✅ CORS configuration

---

## 📝 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/send-otp` | Send OTP to email |
| POST | `/auth/verify-otp` | Verify OTP and login |
| GET | `/auth/google` | Initiate Google OAuth |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/facebook` | Initiate Facebook OAuth |
| GET | `/auth/facebook/callback` | Facebook OAuth callback |
| GET | `/auth/github` | Initiate GitHub OAuth |
| GET | `/auth/github/callback` | GitHub OAuth callback |
| GET | `/auth/me` | Get current user (requires JWT) |
| POST | `/auth/logout` | Logout user |

### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send chat message |
| POST | `/chat-with-file` | Send message with file |
| GET | `/history/:userId` | Get chat history |
| DELETE | `/history/:userId` | Clear chat history |

---

## 🔒 Security Best Practices

1. **Never commit `.env` file to Git**
   - Already added to `.gitignore`
   - Keep all secrets secure

2. **Use strong secrets in production:**
   ```powershell
   # Generate 64-byte random secrets
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Enable HTTPS in production:**
   - Update `cookie: { secure: true }` in server.js
   - Use SSL certificates (Let's Encrypt)

4. **Use environment variables for all secrets:**
   - Never hardcode API keys or passwords
   - Use `.env` file for development
   - Use environment variables in production

5. **Regularly update dependencies:**
   ```powershell
   npm audit
   npm update
   ```

---

## 🎓 Next Steps

1. ✅ Configure MongoDB (Step 1)
2. ✅ Set up Gmail for OTP (Step 2)
3. ✅ Generate secure secrets (Step 4)
4. ✅ Update `.env` file (Step 5)
5. 🚀 Start the server: `npm start`
6. 🎉 Open `http://localhost:3001/login-new.html`
7. 📧 Test OTP login
8. (Optional) Configure OAuth providers (Step 3)
9. 🎨 Customize UI to your liking
10. 🚀 Deploy to production

---

## 📧 Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Verify all environment variables in `.env`
3. Check server console for error messages
4. Ensure all required services are running:
   - MongoDB
   - Node.js server
5. Clear browser cache and localStorage
6. Try in incognito/private mode

---

## 🎉 Congratulations!

You now have a **production-ready authentication system** with:
- ✅ Real OTP email verification
- ✅ OAuth social login (Google, Facebook, GitHub)
- ✅ Secure JWT token management
- ✅ MongoDB database storage
- ✅ Professional UI/UX
- ✅ AI-powered chatbot with file uploads

**No dummy login, no fake authentication - this is the real deal!** 🔥

Happy coding! 🚀
