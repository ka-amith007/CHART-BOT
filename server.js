import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { SYSTEM_PROMPT } from "./systemPrompt.js";
import { setupPassport } from "./config/passport.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'chatbot-session-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
setupPassport();

// MongoDB connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('⚠️  MongoDB URI not configured - authentication features will be limited');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Running without database - authentication features will be limited');
  }
};

connectDB();

// Serve static files
app.use(express.static('.'));

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// In-memory storage for messages (no MongoDB needed for testing)
const conversationHistory = new Map();

// OpenAI client (will validate key on first use)
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-startup"
  });
} catch (err) {
  console.error("Error initializing OpenAI:", err.message);
}

// Helper: save message to memory
function saveMessage(userId, text, type) {
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }
  conversationHistory.get(userId).push({
    message: text,
    type: type,
    timestamp: new Date()
  });
}

// Helper: get conversation history for a user (last 10 messages)
function getConversationHistory(userId, limit = 10) {
  if (!conversationHistory.has(userId)) {
    return [];
  }
  
  const messages = conversationHistory.get(userId).slice(-limit);
  
  return messages.map(msg => ({
    role: msg.type === "incoming" ? "user" : "assistant",
    content: msg.message
  }));
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "running", 
    bot: "Amith Assistant Chatbot",
    version: "1.0.0",
    storage: "in-memory"
  });
});

// Main chat endpoint (text only)
app.post("/chat", async (req, res) => {
  try {
    const { userId, userMessage } = req.body;

    if (!userId || !userMessage) {
      return res.status(400).json({ 
        error: "userId and userMessage are required" 
      });
    }

    // Check if OpenAI key is set
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.status(500).json({ 
        error: "OpenAI API key not configured. Please add your key to the .env file." 
      });
    }

    // Save incoming message
    saveMessage(userId, userMessage, "incoming");

    // Get conversation history
    const history = getConversationHistory(userId);

    // Build messages array for OpenAI
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: userMessage }
    ];

    // Get AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = response.choices[0].message.content;

    // Save outgoing message
    saveMessage(userId, reply, "outgoing");

    // Send reply back
    res.json({ 
      reply,
      userId,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ 
      error: "Something went wrong. Please try again.",
      details: err.message
    });
  }
});

// Chat with file/image upload
app.post("/chat-with-file", upload.single('file'), async (req, res) => {
  try {
    const { userId, userMessage } = req.body;
    const file = req.file;

    if (!userId || !userMessage) {
      return res.status(400).json({ 
        error: "userId and userMessage are required" 
      });
    }

    // Check if OpenAI key is set
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.status(500).json({ 
        error: "OpenAI API key not configured. Please add your key to the .env file." 
      });
    }

    let messageContent = userMessage;

    // Save incoming message
    if (file) {
      messageContent = `[File: ${file.originalname}] ${userMessage}`;
      saveMessage(userId, messageContent, "incoming");
    } else {
      saveMessage(userId, userMessage, "incoming");
    }

    // Get conversation history
    const history = getConversationHistory(userId);

    // Build messages array
    const messages = [
      { role: "system", content: SYSTEM_PROMPT }
    ];

    // Add history
    messages.push(...history);

    // Handle image files with vision
    if (file && file.mimetype.startsWith('image/')) {
      const imageBase64 = fs.readFileSync(file.path, { encoding: 'base64' });
      const imageUrl = `data:${file.mimetype};base64,${imageBase64}`;

      messages.push({
        role: "user",
        content: [
          { type: "text", text: userMessage },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      });

      // Get AI response with vision
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      });

      const reply = response.choices[0].message.content;
      saveMessage(userId, reply, "outgoing");

      // Clean up uploaded file
      fs.unlinkSync(file.path);

      res.json({ 
        reply,
        userId,
        fileProcessed: true,
        timestamp: new Date().toISOString()
      });

    } else if (file) {
      // Handle non-image files (text/code files)
      const fileContent = fs.readFileSync(file.path, 'utf-8').substring(0, 10000); // Limit to 10k chars
      
      messages.push({
        role: "user",
        content: `${userMessage}\n\nFile content (${file.originalname}):\n\`\`\`\n${fileContent}\n\`\`\``
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      });

      const reply = response.choices[0].message.content;
      saveMessage(userId, reply, "outgoing");

      // Clean up uploaded file
      fs.unlinkSync(file.path);

      res.json({ 
        reply,
        userId,
        fileProcessed: true,
        timestamp: new Date().toISOString()
      });
    } else {
      // No file, treat as regular chat
      messages.push({ role: "user", content: userMessage });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      });

      const reply = response.choices[0].message.content;
      saveMessage(userId, reply, "outgoing");

      res.json({ 
        reply,
        userId,
        timestamp: new Date().toISOString()
      });
    }

  } catch (err) {
    console.error("Error in /chat-with-file:", err);
    
    // Clean up file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      error: "Something went wrong. Please try again.",
      details: err.message
    });
  }
});

// Get chat history endpoint
app.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const messages = conversationHistory.get(userId) || [];

    res.json({
      userId,
      messages: messages.slice(-limit),
      count: messages.length
    });

  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Clear chat history endpoint
app.delete("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const count = conversationHistory.get(userId)?.length || 0;
    conversationHistory.delete(userId);

    res.json({
      message: "Chat history cleared",
      deletedCount: count
    });

  } catch (err) {
    console.error("Error clearing history:", err);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// Mount authentication routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Amith Professional Auth System & Chatbot running on port ${PORT}`);
  console.log(`📝 Chat endpoint: http://localhost:${PORT}/chat`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/auth/*`);
  console.log(`🌐 Open login.html in your browser to start\n`);
  
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log(`⚠️  WARNING: OpenAI API key not configured!`);
    console.log(`   Please add your API key to the .env file`);
    console.log(`   Get one at: https://platform.openai.com/api-keys\n`);
  }
  
  if (!process.env.MONGODB_URI) {
    console.log(`⚠️  WARNING: MongoDB URI not configured!`);
    console.log(`   Add MONGODB_URI to .env for authentication features\n`);
  }
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log(`⚠️  WARNING: Email credentials not configured!`);
    console.log(`   Add EMAIL_USER and EMAIL_PASSWORD to .env for OTP emails\n`);
  }
  
  const missingOAuth = [];
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) missingOAuth.push('Google');
  if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) missingOAuth.push('Facebook');
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) missingOAuth.push('GitHub');
  
  if (missingOAuth.length > 0) {
    console.log(`⚠️  WARNING: OAuth credentials missing for: ${missingOAuth.join(', ')}`);
    console.log(`   Add credentials to .env for OAuth login\n`);
  }
});
