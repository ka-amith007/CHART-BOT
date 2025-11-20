# CHATBOT Mobile App

React Native mobile application for iOS and Android.

## Quick Start

### Prerequisites
- Node.js installed
- For iOS: macOS with Xcode
- For Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Features
- AI Chat with OpenAI
- Image upload and analysis
- File upload support
- Offline mode with local storage
- Push notifications (optional)

## Server Configuration

Make sure your server is accessible:
- Local testing: Use your computer's IP address
- Production: Deploy server to cloud (Heroku, AWS, Azure)

Update `API_URL` in `src/config.js` with your server address.
