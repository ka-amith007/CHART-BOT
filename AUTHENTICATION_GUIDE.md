# Amith Assistant Chatbot - Authentication System

## Overview
Your chatbot now has a complete authentication system with social login options and session management!

## Features Implemented ✅

### 1. Login Page (`login.html`)
- **Social Login Options**: Google, Facebook, GitHub buttons
- **Email/Password Login**: Traditional login form
- **Guest Mode**: Quick access without registration
- **User Session Storage**: Uses localStorage to store user data

### 2. Chat Interface (`chat-with-upload.html`)
- **Login Protection**: Automatically redirects to login page if not authenticated
- **User Display**: Shows "Logged in as [username]" in the header
- **Logout Button**: Clean logout with confirmation dialog
- **Personalized Welcome**: Greets user by name when they enter the chat

## How It Works

### Login Flow
1. User opens `login.html` or is redirected from chat
2. User chooses login method:
   - **Social Login**: Clicks Google/Facebook/GitHub → prompted for username
   - **Email/Password**: Enters credentials → logs in
   - **Guest Mode**: Enters as guest without credentials
3. User data stored in localStorage as JSON:
   ```json
   {
     "username": "John",
     "provider": "google",
     "loginTime": "2024-01-15T10:30:00.000Z"
   }
   ```
4. Redirects to `chat-with-upload.html`

### Chat Session
- Chat checks for user data on load
- Displays username in header
- Shows personalized welcome message
- Maintains conversation until logout

### Logout Flow
- User clicks "Logout" button
- Confirmation dialog appears
- On confirm: clears localStorage and redirects to login page

## File Structure
```
CHART BOT/
├── server.js              # Backend API server (port 3001)
├── login.html             # Authentication page
├── chat-with-upload.html  # Main chat interface with file upload
├── test-chat.html         # Simple chat (no auth)
├── systemPrompt.js        # Chatbot personality
├── package.json           # Node.js dependencies
├── .env                   # OpenAI API key
└── README.md              # Setup instructions
```

## Testing the Authentication

### Step 1: Start the Server
```powershell
cd "C:\Users\Anusha\Desktop\CHART BOT"
npm start
```

### Step 2: Open Login Page
Open `login.html` in your browser:
```
file:///C:/Users/Anusha/Desktop/CHART%20BOT/login.html
```

### Step 3: Login
- Click any social login button OR
- Enter email/password and click Login OR
- Click "Continue as Guest"

### Step 4: Use Chatbot
- You'll be redirected to the chat interface
- See your username displayed in the header
- Upload files/images or chat normally
- Click "Logout" when done

## Current Implementation Details

### Authentication Type
- **Client-side only** using localStorage
- No backend authentication endpoints (yet)
- No password encryption or validation
- Social OAuth not configured (prompts for username only)

### What's Missing (Future Enhancements)

#### Backend Authentication (Optional)
If you want secure authentication with a database:
1. Add backend endpoints in `server.js`:
   - `/auth/login` - Validate credentials
   - `/auth/register` - Create new users
   - `/auth/logout` - Clear sessions
   - `/auth/status` - Check login status

2. Use sessions or JWT tokens instead of localStorage

3. Add password hashing with bcrypt

#### Social OAuth Setup (Optional)
To enable real Google/Facebook/GitHub login:
1. Create OAuth apps on each platform
2. Get Client IDs and Secrets
3. Install passport.js: `npm install passport passport-google-oauth20`
4. Configure OAuth callback URLs
5. Handle OAuth tokens in backend

#### Welcome Email/SMS (Optional)
To send welcome messages after login:
1. Install nodemailer: `npm install nodemailer`
2. Configure SMTP settings in `.env`
3. Add email template
4. Trigger email after successful login

## Security Considerations

⚠️ **Current Setup**: Development/demo only
- Passwords not encrypted
- Data stored in browser (can be cleared)
- No session expiration
- No rate limiting

✅ **For Production**: 
- Move authentication to backend
- Use HTTPS only
- Implement JWT or session tokens
- Add password hashing (bcrypt)
- Set session timeouts
- Add CSRF protection

## Troubleshooting

### Issue: Stuck on login page
**Solution**: Clear browser's localStorage
```javascript
// In browser console (F12):
localStorage.clear();
location.reload();
```

### Issue: Can't logout
**Solution**: Check if `logout()` function exists
- Open browser console (F12)
- Look for JavaScript errors
- Verify `chat-with-upload.html` has logout function

### Issue: Username not showing
**Solution**: Check localStorage data
```javascript
// In browser console (F12):
console.log(localStorage.getItem('user'));
```

## API Endpoints

### Existing Endpoints
- `GET /` - Health check
- `POST /chat` - Text-only chat (no auth required)
- `POST /chat-with-file` - Chat with file upload (no auth required)
- `GET /history/:userId` - Get conversation history
- `DELETE /history/:userId` - Clear chat history

### Future Authentication Endpoints
```
POST /auth/register - Create new user account
POST /auth/login - Authenticate user
POST /auth/logout - End user session
GET /auth/status - Check if user is logged in
POST /auth/social/:provider - OAuth callback handler
```

## Environment Variables

Current `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

For future authentication:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
JWT_SECRET=your-secret-key-here
SESSION_SECRET=another-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret
```

## Next Steps

### Option 1: Use As-Is (Quick Demo)
The current setup works perfectly for:
- Local testing
- Demos and prototypes
- Personal use
- Learning purposes

### Option 2: Add Backend Auth (Recommended for Production)
If deploying publicly:
1. Create user database (MongoDB/PostgreSQL)
2. Add backend authentication endpoints
3. Implement JWT or session-based auth
4. Add password hashing and validation

### Option 3: Configure Social OAuth (For Professional Apps)
If you want real social login:
1. Register apps on Google/Facebook/GitHub
2. Get OAuth credentials
3. Install and configure passport.js
4. Set up callback URLs

## Support

If you need help with any of these enhancements:
1. Backend authentication setup
2. Social OAuth configuration
3. Email/SMS welcome messages
4. Database integration
5. Production deployment

Just ask! 😊

---

**Created**: January 2024  
**Version**: 1.0  
**Status**: Development/Demo Ready ✅
