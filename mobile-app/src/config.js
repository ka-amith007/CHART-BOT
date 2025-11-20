// API Configuration
// Use Netlify deployed backend for mobile app
export const API_URL = 'https://chartb0t.netlify.app/.netlify/functions/api';

// For local development:
// export const API_URL = 'http://10.0.2.2:3001'; // Android Emulator
// export const API_URL = 'http://localhost:3001'; // iOS Simulator
// export const API_URL = 'http://YOUR_COMPUTER_IP:3001'; // Physical device

export const ENDPOINTS = {
  CHAT: '/chat',
  CHAT_WITH_FILE: '/chat-with-file',
  HISTORY: '/history',
};
