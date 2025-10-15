# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native 0.82.0 application bootstrapped with `@react-native-community/cli`. The project uses TypeScript and supports both iOS and Android platforms with the new React Native architecture enabled.

## Development Commands

### Setup
- **Initial setup**: `npm install`
- **iOS CocoaPods setup**:
  - First time: `bundle install` (installs CocoaPods)
  - After native dependency changes: `bundle exec pod install` (from root directory)

### Running the app
- **Start Metro bundler**: `npm start`
- **Run on Android**: `npm run android`
- **Run on iOS**: `npm run ios`

### Testing and Quality
- **Run all tests**: `npm test`
- **Run single test file**: `jest path/to/test.tsx`
- **Lint code**: `npm run lint`

## Architecture

### Entry Points
- `index.js`: Main application entry point that registers the root component
- `App.tsx`: Root React component wrapped with SafeAreaProvider

### Platform-Specific Code
- **Android**:
  - Package: `com.hammozo_app`
  - MainActivity: `android/app/src/main/java/com/hammozo_app/MainActivity.kt`
  - Application: `android/app/src/main/java/com/hammozo_app/MainApplication.kt`
  - Uses DefaultReactActivityDelegate with New Architecture support

- **iOS**:
  - Module name: `hammozo_app`
  - AppDelegate: `ios/hammozo_app/AppDelegate.swift`
  - Uses Swift with RCTReactNativeFactory pattern
  - Debug builds load bundle from Metro, release builds use bundled jsbundle

### Key Dependencies
- **React**: 19.1.1
- **React Native**: 0.82.0
- **react-native-safe-area-context**: Safe area handling across devices
- **@react-native/new-app-screen**: Default app screen template

### Configuration Files
- **TypeScript**: Extends `@react-native/typescript-config`
- **Babel**: Standard React Native preset in `babel.config.js`
- **Metro**: Custom configuration in `metro.config.js`
- **Jest**: Uses React Native preset

## Development Notes

### iOS Development
CocoaPods dependencies must be installed before running iOS builds. When native dependencies change (new React Native libraries with native modules), run `bundle exec pod install` from the project root before building.

### New Architecture
The project is configured to support React Native's New Architecture (Fabric/TurboModules). Both MainActivity.kt and AppDelegate.swift are set up with the required delegates.

### Fast Refresh
The app supports Fast Refresh for immediate feedback when editing JavaScript/TypeScript code. For full reload:
- **Android**: Press R twice or Ctrl+M (Cmd+M on macOS) for dev menu
- **iOS**: Press R in simulator

### Testing
Jest is configured with the `react-native` preset. Test files should be placed in `__tests__/` directory with `.test.tsx` or `.test.ts` extension.
