# 🤖 Amith - AI Assistant Chatbot

A powerful AI-powered chatbot built with OpenAI's GPT-4o-mini, featuring intelligent conversations, image analysis, and file processing capabilities.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.19-blue.svg)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-orange.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ Features

- 💬 **Intelligent Conversations** - Natural language processing powered by OpenAI GPT-4o-mini
- 🖼️ **Image Analysis** - Upload and analyze images with AI vision capabilities
- 📁 **File Processing** - Support for text, code, and document files (txt, js, py, java, html, css, json, md, pdf)
- � **Conversation History** - Maintains context across multiple messages
- 🎨 **Modern UI** - Clean, professional ChatGPT-style interface
- ⚡ **Real-time Responses** - Fast and responsive chat experience

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **OpenAI API Key** - Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   
   Navigate to: **http://localhost:3001/chat-with-upload.html**

---

## 📖 Usage

### Text Chat
1. Type your message in the input field
2. Press Enter or click "Send"
3. Receive AI-powered responses instantly

### Image Analysis
1. Click the "📎 Attach" button
2. Select an image file (jpg, png, gif, etc.)
3. Add a message or question about the image
4. Click "Send" to get AI analysis

### File Processing
1. Click the "📎 Attach" button
2. Select a supported file (txt, js, py, html, css, json, md, pdf)
3. Ask questions or request analysis
4. Get intelligent insights about your file

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - GPT-4o-mini for AI conversations
- **Multer** - File upload handling
- **dotenv** - Environment variable management

### Frontend
- **HTML5/CSS3** - Modern web standards
- **Vanilla JavaScript** - No framework dependencies
- **Responsive Design** - Works on all devices

---

## � Project Structure

```
CHART BOT/
├── server.js              # Express server & API endpoints
├── chat-with-upload.html  # Main chat interface
├── systemPrompt.js        # AI system prompt configuration
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
├── logo.png               # Application logo
└── uploads/               # Temporary file storage
```

---

## � API Endpoints

### `POST /chat`
Send a text message to the AI assistant.

**Request Body:**
```json
{
  "userId": "user_123",
  "userMessage": "Hello, how are you?"
}
```

### `POST /chat-with-file`
Send a message with an optional file attachment.

**Form Data:**
- `userId` - Unique user identifier
- `userMessage` - Text message
- `file` - File attachment (optional)

### `GET /history/:userId`
Retrieve conversation history for a specific user.

### `DELETE /history/:userId`
Clear conversation history for a specific user.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key |
| `PORT` | ❌ No | Server port (default: 3001) |

---

## 🎯 Features in Detail

### Conversation Memory
- Maintains last 10 messages per user
- Provides context-aware responses
- In-memory storage (no database required)

### File Upload Support
- **Images**: jpg, png, gif, webp, bmp
- **Code**: js, py, java, html, css, json
- **Documents**: txt, md, pdf
- Maximum file size: 10MB

### AI Capabilities
- Natural language understanding
- Code analysis and debugging
- Image recognition and description
- Document summarization
- Multi-turn conversations

---

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- Uploaded files are automatically deleted after processing
- CORS is enabled for local development

---

## 📝 Scripts

```bash
# Start the server
npm start

# Start with auto-reload (development)
npm run dev
```

---

## � Troubleshooting

### Server won't start
- Ensure Node.js v18+ is installed
- Check if port 3001 is available
- Verify `.env` file exists with valid API key

### API Key Error
- Confirm your OpenAI API key is valid
- Check for typos in the `.env` file
- Ensure you have API credits available

### File Upload Issues
- Check file size (max 10MB)
- Verify file type is supported
- Ensure `uploads/` directory exists

---

## � License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👨‍� Author

**Amith**

---

## 🙏 Acknowledgments

- Built with [OpenAI GPT-4o-mini](https://openai.com/)
- Powered by [Express.js](https://expressjs.com/)
- UI inspired by modern chat interfaces

---

**Ready to chat? Start the server and visit http://localhost:3001/chat-with-upload.html** 🚀
