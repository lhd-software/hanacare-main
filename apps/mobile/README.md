# HanaCare Mobile App

React Native CLI mobile application for HanaCare Super App.

## Prerequisites

- Node.js 18+
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK)

## Development

```bash
# Install dependencies (from root)
bun install

# Start Metro bundler
bun run dev:mobile
# or
cd apps/mobile && bun run start

# Run on Android (in another terminal)
cd apps/mobile && bun run android

# Run on iOS (in another terminal, macOS only)
cd apps/mobile && bun run ios
```

## Environment Setup

1. **Android Setup**
   - Install Android Studio
   - Set up Android SDK
   - Create an Android Virtual Device (AVD)

2. **iOS Setup (macOS only)**
   - Install Xcode from App Store
   - Install CocoaPods: `sudo gem install cocoapods`
   - Install pods: `cd apps/mobile/ios && pod install`

## Build

```bash
# Android
cd apps/mobile && bun run android

# iOS
cd apps/mobile && bun run ios
```

## Tech Stack

- React Native CLI
- TypeScript
- Supabase Client
