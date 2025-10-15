# Android Setup Guide

## Error: `npm run android` Failed

If you're seeing errors like:
- `'adb' is not recognized`
- `'gradlew.bat' is not recognized`
- `No emulators found`

This means **Android development environment is not set up yet**.

## Required Setup

### 1. Install JDK (Java Development Kit)
Download and install JDK 17 or 20 from:
- [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- [OpenJDK](https://adoptium.net/)

After installation, set **JAVA_HOME** environment variable:
```
C:\Program Files\Java\jdk-17
```

Add to PATH:
```
%JAVA_HOME%\bin
```

Verify installation:
```bash
java -version
```

### 2. Install Android Studio
Download and install from: https://developer.android.com/studio

### 3. Install Android SDK
During Android Studio installation, make sure to install:
- Android SDK
- Android SDK Platform (API 36)
- Android Virtual Device (AVD)

### 4. Set Environment Variables

Add these to your Windows Environment Variables:

**ANDROID_HOME**
```
C:\Users\[YourUsername]\AppData\Local\Android\Sdk
```

**Add to PATH:**
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

### 5. Create Virtual Device (Emulator)

1. Open Android Studio
2. Go to: **Tools → Device Manager**
3. Click **Create Device**
4. Select a phone (e.g., Pixel 5)
5. Select a system image (e.g., API 33 - Android 13)
6. Click **Finish**

### 6. Verify Setup

Run the React Native doctor command:
```bash
npx react-native doctor
```

This will check:
- ✅ Node.js installed
- ✅ JDK installed (version 17-20)
- ✅ Android SDK installed (API 36)
- ✅ ANDROID_HOME configured
- ✅ ADB available
- ✅ Gradlew available
- ✅ Emulator available

## Running the App

### Option 1: With Emulator

1. **Start the emulator first:**
   ```bash
   # List available emulators
   emulator -list-avds

   # Start an emulator (replace with your AVD name)
   emulator -avd Pixel_5_API_33
   ```

2. **In a new terminal, run:**
   ```bash
   npm run android
   ```

### Option 2: With Physical Device

1. **Enable Developer Options on your Android device:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect device via USB**

3. **Verify device is connected:**
   ```bash
   adb devices
   ```

4. **Run the app:**
   ```bash
   npm run android
   ```

## Troubleshooting

### ADB not found
**Solution:** Add Android SDK platform-tools to PATH
```
%ANDROID_HOME%\platform-tools
```

### Gradle build failed
**Solution:** Run gradle wrapper from android directory
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro bundler port conflict
**Solution:** Kill existing Metro process
```bash
# Windows
npx react-native start --reset-cache
```

### Build errors after dependency changes
**Solution:** Clean and rebuild
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Quick Start (If Already Set Up)

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Run on Android
npm run android
```

## Alternative: Expo Go (Simpler Setup)

If you want to test quickly without full Android Studio setup:
1. Install Expo Go app on your phone
2. Convert to Expo project
3. Scan QR code

But for production apps with native modules (like this one), you need full Android Studio setup.

## Next Steps

Once environment is configured:
1. ✅ Run `npx react-native doctor` - verify all checks pass
2. ✅ Start emulator or connect device
3. ✅ Run `npm run android`
4. ✅ Test all features: login, auto-lock, biometrics, products

## Resources

- [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)
- [Android Studio Download](https://developer.android.com/studio)
- [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
