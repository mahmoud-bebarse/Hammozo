# Hammozo App

A production-ready React Native TypeScript application featuring authentication, auto-lock security, offline support, and optimized list performance.

## Features

### Core Functionality
- **Authentication**: DummyJSON API integration with token-based auth
- **Biometric Unlock**: Face ID/Touch ID with password fallback
- **Auto-Lock**: 10-second inactivity timeout and background lock
- **Product Lists**: All products and category-filtered views with pull-to-refresh
- **Superadmin Mode**: Product deletion for designated admin users
- **Offline Support**: React Query cache persistence with MMKV
- **Network Status**: Visual offline banner when disconnected

### Performance Optimizations
- **List Performance**: `getItemLayout`, stable keys, memoized components
- **Cold Start**: MMKV-persisted cache for instant list rendering
- **Minimal Dependencies**: Carefully selected, lightweight libraries
- **Optimistic Updates**: Immediate UI feedback for delete operations

## Configuration

### App Settings (src/utils/constants.ts)
```typescript
CHOSEN_CATEGORY = "smartphones"        // Category screen filter
SUPERADMIN_USERNAME = "emilys"        // User with delete permissions
AUTO_LOCK_TIMEOUT_MS = 10000          // 10 seconds inactivity
```

### Test Credentials
- **Username**: `emilys`
- **Password**: `emilyspass`
- **Superadmin**: `emilys` (can delete products from All Products screen)

## Getting Started

### Prerequisites
- Node.js >= 20
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- iOS: Xcode, CocoaPods, Ruby bundler
- Android: Android Studio, JDK

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **iOS only: Install CocoaPods**
```bash
cd ios && bundle exec pod install && cd ..
```

### Running the App

1. **Start Metro bundler**
```bash
npm start
```

2. **Run on platform** (in a new terminal)

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
