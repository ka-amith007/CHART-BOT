# Amith Assistant Chatbot 🤖

A friendly WhatsApp-style AI chatbot that helps with programming, career advice, fitness, and general questions.

## Features ✨

- 💬 Natural conversational responses
- 🧠 Context-aware (remembers conversation history)
- 📚 Helps with coding, DSA, projects, career, fitness
- 💾 Stores all conversations in MongoDB
- 🔌 Easy to integrate with WhatsApp, Telegram, or websites

## Quick Setup 🚀

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure Environment

Edit `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
MONGO_URI=mongodb://localhost:27017/amith_chatbot
PORT=3000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system, or use MongoDB Atlas (cloud).

### 4. Run the Server

```powershell
npm start
```

Server will start at `http://localhost:3000`

## API Endpoints 📡

### POST `/chat`

Send a message and get AI response.

**Request:**
```json
{
  "userId": "user123",
  "userMessage": "Explain binary search"
}
```

**Response:**
```json
{
  "reply": "Binary search is a fast algorithm...",
  "userId": "user123",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### GET `/history/:userId`

Get conversation history for a user.

```
GET http://localhost:3000/history/user123?limit=20
```

### DELETE `/history/:userId`

Clear chat history for a user.

```
DELETE http://localhost:3000/history/user123
```

## Test the Bot 🧪

Using PowerShell:

```powershell
$body = @{
    userId = "test_user"
    userMessage = "Hi, explain DSA"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method POST -Body $body -ContentType "application/json"
```

## Integration Examples 🔗

### Website Chat (JavaScript)

```javascript
async function sendMessage(userId, message) {
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, userMessage: message })
  });
  const data = await response.json();
  return data.reply;
}
```

### WhatsApp Bot

Connect this backend to Meta's WhatsApp Cloud API by:
1. Setting up a webhook that calls `/chat`
2. Sending replies back via WhatsApp API

### Telegram Bot

Use a Telegram webhook that forwards messages to `/chat` endpoint.

## Tech Stack 🛠

- **Node.js** + Express
- **OpenAI GPT-4o-mini**
- **MongoDB** (message storage)
- **CORS** enabled for web integration

## Customization 🎨

Edit `systemPrompt.js` to change the bot's personality, tone, or capabilities.

## Troubleshooting 🔧

**Error: MongoDB connection failed**
- Make sure MongoDB is running
- Or use MongoDB Atlas and update `MONGO_URI` in `.env`

**Error: OpenAI API error**
- Check your API key in `.env`
- Verify you have credits at https://platform.openai.com

## Need Help? 💡

Open an issue or contact the developer.

---

Made with ❤️ by Amith
