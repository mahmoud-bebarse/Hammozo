# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites

**⚠️ Important:** You must have React Native development environment set up first!

- **Android:** Android Studio + SDK + Emulator ([Setup Guide](ANDROID_SETUP.md))
- **iOS:** Xcode + CocoaPods (macOS only)
- **Quick Check:** Run `npx react-native doctor` to verify setup

### 1. Install Dependencies
```bash
npm install
```

### 2. iOS Only: Install Pods
```bash
cd ios && bundle exec pod install && cd ..
```

### 3. Start Metro
```bash
npm start
```

### 4. Run App (in new terminal)

**iOS:** (macOS only)
```bash
npm run ios
```

**Android:** (Start emulator first!)
```bash
# Check emulator is running:
adb devices

# Then run:
npm run android
```

**🔴 Android Not Working?** See [ANDROID_SETUP.md](ANDROID_SETUP.md) for complete setup instructions.

## 🔐 Test Login

Use these credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

## ✅ Features to Test

1. **Login** → Should see product list
2. **Wait 10 seconds** → App locks automatically
3. **Unlock with biometric** → Or use password fallback
4. **Delete a product** → Only works as superadmin (emilys)
5. **Pull to refresh** → Updates product list
6. **Go offline** → Turn off WiFi, lists still visible
7. **Switch tabs** → Test "Smartphones" category
8. **Background app** → Lock triggers immediately
9. **Sign out** → Last tab item

## 📱 Screens

1. **Login Screen** - Enter credentials
2. **All Products** - Full product list with delete (superadmin)
3. **Smartphones** - Filtered by category
4. **Sign Out** - Clears session

## 🎯 Key Configuration

Edit `src/utils/constants.ts` to change:
- `CHOSEN_CATEGORY` - Category to display
- `SUPERADMIN_USERNAME` - Who can delete products
- `AUTO_LOCK_TIMEOUT_MS` - Lock delay (default 10s)

## 🐛 Common Issues

**Metro won't start?**
```bash
npm start -- --reset-cache
```

**iOS build fails?**
```bash
cd ios && bundle exec pod repo update && bundle exec pod install --repo-update && cd ..
```

**Android build fails?**
```bash
cd android && ./gradlew clean && cd .. && npm run android
```

**Biometrics not working?**
- Use "Use Password" button as fallback
- Simulators mock biometrics automatically

## 📚 More Info

- Full docs: `README.md`
- Project summary: `PROJECT_SUMMARY.md`
- Claude Code guidance: `CLAUDE.md`

Happy coding! 🎉
