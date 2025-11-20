# ChatBot Mobile App - Setup Instructions

## Prerequisites Installed?
Before you begin, make sure you have:
- ✅ Node.js 18+ installed
- ✅ React Native CLI: `npm install -g react-native-cli`
- ✅ For Android: Android Studio with Android SDK
- ✅ For iOS (Mac only): Xcode 14+

## Quick Start

### 1. Install Dependencies
```bash
cd mobile-app
npm install
```

### 2. iOS Setup (Mac only)
```bash
cd ios
pod install
cd ..
```

### 3. Configure API URL

Edit `src/config.js` and set your API URL:

- **Android Emulator**: Use `http://10.0.2.2:3001` (already set)
- **iOS Simulator**: Use `http://localhost:3001`
- **Physical Device**: Use `http://YOUR_COMPUTER_IP:3001`

Find your computer's IP:
- Windows: `ipconfig` (look for IPv4 Address)
- Mac/Linux: `ifconfig` or `ip addr`

### 4. Make sure your backend server is running
```bash
# In the main project folder
node server.js
```

Server should be running on `http://localhost:3001`

### 5. Run the App

#### Android
```bash
npm run android
```

#### iOS (Mac only)
```bash
npm run ios
```

## Troubleshooting

### Android Issues

**Metro bundler not starting:**
```bash
npm start -- --reset-cache
```

**Build errors:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**Cannot connect to server:**
- Make sure server is running on port 3001
- Use `http://10.0.2.2:3001` for Android emulator
- For physical device, use your computer's IP address
- Make sure phone and computer are on the same WiFi network

### iOS Issues

**Pod install errors:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Build errors:**
```bash
cd ios
xcodebuild clean
cd ..
npm run ios
```

**Cannot connect to server:**
- Use `http://localhost:3001` for iOS simulator
- For physical device, use your computer's IP address
- Make sure iPhone and computer are on the same WiFi network

## Features

- ✅ AI Chat with OpenAI GPT-4
- ✅ Image Upload & Analysis
- ✅ Document Upload
- ✅ Offline message storage (AsyncStorage)
- ✅ Clean UI matching web version

## Project Structure

```
mobile-app/
├── src/
│   ├── components/
│   │   ├── MessageBubble.js    # Chat message component
│   │   └── InputBox.js         # Input with file upload
│   ├── screens/
│   │   └── ChatScreen.js       # Main chat screen
│   ├── services/
│   │   └── ChatService.js      # API communication
│   └── config.js               # API configuration
├── App.js                      # Main app component
├── index.js                    # Entry point
└── package.json                # Dependencies
```

## Testing on Physical Device

### Android
1. Enable USB debugging on your Android device
2. Connect device via USB
3. Run: `adb devices` to verify connection
4. Run: `npm run android`
5. Update `src/config.js` with your computer's IP address

### iOS
1. Open `ios/ChatBotMobile.xcworkspace` in Xcode
2. Select your device from device list
3. Click Run button or press Cmd+R
4. Trust the developer certificate on your iPhone (Settings > General > Device Management)
5. Update `src/config.js` with your computer's IP address

## Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS IPA
1. Open project in Xcode
2. Select "Any iOS Device" as target
3. Product > Archive
4. Follow distribution wizard

## Need Help?

- Make sure backend server is running on port 3001
- Check that your device/emulator can reach the server
- Verify API_URL in `src/config.js` is correct
- Check console logs for detailed error messages
