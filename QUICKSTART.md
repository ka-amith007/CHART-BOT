# 🚀 Quick Start Guide - CHATBOT Professional Auth System

## ⚡ Fastest Way to Get Started

### 1. Install MongoDB (2 minutes)

**Quick Option - MongoDB Atlas (Cloud):**
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free cluster
4. Get connection string
5. Add to .env as MONGODB_URI
```

**OR Local MongoDB:**
```powershell
# Download from: https://www.mongodb.com/try/download/community
# Install and start service
Start-Service -Name MongoDB
```

---

### 2. Configure Gmail for OTP (3 minutes)

```
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
3. Add to .env:
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop  (remove spaces)
```

---

### 3. Generate Secrets (30 seconds)

Run in PowerShell:
```powershell
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
```

Copy outputs to `.env` file.

---

### 4. Update .env File

Minimum required configuration:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_jwt_secret
SESSION_SECRET=your_generated_session_secret
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

---

### 5. Start the Server

```powershell
npm start
```

---

### 6. Open Your Browser

Go to: **http://localhost:3001/login-new.html**

---

## ✅ Test Your Authentication

### Email OTP Login:
1. Enter name and email
2. Click "Send OTP"
3. Check email inbox
4. Enter 6-digit code
5. Click "Verify & Login"
6. Chat with AI! 🎉

---

## 🎯 Optional: OAuth Setup (5 minutes each)

### Google OAuth:
```
1. https://console.cloud.google.com/apis/credentials
2. Create OAuth Client ID
3. Redirect URI: http://localhost:3001/auth/google/callback
4. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env
```

### Facebook OAuth:
```
1. https://developers.facebook.com/apps/
2. Create app + Add Facebook Login
3. Redirect URI: http://localhost:3001/auth/facebook/callback
4. Add FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to .env
```

### GitHub OAuth:
```
1. https://github.com/settings/developers
2. New OAuth App
3. Callback URL: http://localhost:3001/auth/github/callback
4. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to .env
```

---

## 🔥 You're Ready!

**Total setup time: ~10 minutes**

### What You Get:
✅ Real OTP email verification  
✅ Secure JWT authentication  
✅ MongoDB user storage  
✅ Professional UI  
✅ AI chatbot with file uploads  
✅ OAuth social login (optional)  

**No dummy login. Production-ready authentication!** 🚀

---

## 📚 Need More Details?

Read the full **SETUP_GUIDE.md** for:
- Detailed troubleshooting
- Security best practices
- API endpoint documentation
- System architecture
- Production deployment guide

---

## 🆘 Quick Troubleshooting

**Can't send OTP?**
- Use Gmail App Password (not regular password)
- Enable 2-Step Verification first
- Remove spaces from app password

**MongoDB connection failed?**
- Check MongoDB is running: `Get-Service -Name MongoDB`
- Verify connection string in .env
- URL-encode special characters in password

**OAuth not working?**
- Check redirect URI matches exactly
- Restart server after updating .env
- Make sure OAuth app is not in test mode

---

**Ready to chat? Start your server and visit login-new.html!** 🎉
