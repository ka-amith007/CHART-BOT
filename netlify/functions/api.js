const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const OpenAI = require('openai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory conversation storage
const conversations = new Map();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// System prompt
const systemPrompt = `You are Amith Assistant, a helpful and friendly AI assistant. You provide clear, accurate, and helpful responses to user questions. You can analyze images and files when provided.`;

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let conversationHistory = conversations.get(userId) || [
      { role: 'system', content: systemPrompt }
    ];

    conversationHistory.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conversationHistory,
      max_tokens: 1000,
    });

    const assistantMessage = completion.choices[0].message.content;
    conversationHistory.push({ role: 'assistant', content: assistantMessage });

    conversations.set(userId, conversationHistory);

    res.json({ response: assistantMessage });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Chat with file endpoint
app.post('/chat-with-file', upload.single('file'), async (req, res) => {
  try {
    const { message, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    let conversationHistory = conversations.get(userId) || [
      { role: 'system', content: systemPrompt }
    ];

    const isImage = file.mimetype.startsWith('image/');
    
    if (isImage) {
      const base64Image = file.buffer.toString('base64');
      const imageUrl = `data:${file.mimetype};base64,${base64Image}`;

      conversationHistory.push({
        role: 'user',
        content: [
          { type: 'text', text: message || 'What is in this image?' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: conversationHistory,
        max_tokens: 1000,
      });

      const assistantMessage = completion.choices[0].message.content;
      conversationHistory.push({ role: 'assistant', content: assistantMessage });
      conversations.set(userId, conversationHistory);

      res.json({ response: assistantMessage });
    } else {
      const fileContent = file.buffer.toString('utf-8');
      const userMessage = `${message || 'Analyze this file'}\n\nFile: ${file.originalname}\nContent:\n${fileContent}`;

      conversationHistory.push({ role: 'user', content: userMessage });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: conversationHistory,
        max_tokens: 1000,
      });

      const assistantMessage = completion.choices[0].message.content;
      conversationHistory.push({ role: 'assistant', content: assistantMessage });
      conversations.set(userId, conversationHistory);

      res.json({ response: assistantMessage });
    }
  } catch (error) {
    console.error('File chat error:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

// Get history endpoint
app.get('/history/:userId', (req, res) => {
  const { userId } = req.params;
  const history = conversations.get(userId) || [];
  res.json({ history: history.filter(msg => msg.role !== 'system') });
});

// Clear history endpoint
app.delete('/history/:userId', (req, res) => {
  const { userId } = req.params;
  conversations.delete(userId);
  res.json({ message: 'History cleared' });
});

module.exports.handler = serverless(app);
