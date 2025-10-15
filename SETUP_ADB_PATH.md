# Setup ADB PATH - Quick Guide

## 📦 What This Does

Adds the Android ADB (Android Debug Bridge) tools to your Windows system PATH so you can run Android commands from anywhere.

**ADB Path:** `C:\Users\Mahmo\Downloads\platform-tools-latest-windows\platform-tools`

## 🚀 Quick Setup (Choose One Method)

### Method 1: PowerShell Script (Recommended)

1. **Right-click** `setup-android-path.ps1`
2. Select **"Run with PowerShell"**
3. If you see a security warning, type `Y` and press Enter
4. Follow the on-screen instructions

### Method 2: Batch File

1. **Right-click** `setup-android-path.bat`
2. Select **"Run as administrator"**
3. Click **Yes** on the UAC prompt
4. Follow the on-screen instructions

### Method 3: Manual Setup

If the scripts don't work, add manually:

1. Press **Windows + R**
2. Type: `sysdm.cpl` and press Enter
3. Go to **Advanced** tab → **Environment Variables**
4. Under **System variables**, find and select **Path**
5. Click **Edit**
6. Click **New**
7. Add: `C:\Users\Mahmo\Downloads\platform-tools-latest-windows\platform-tools`
8. Click **OK** on all windows
9. **Restart your terminal**

## ✅ Verify Installation

After running the script and opening a **new terminal**:

```bash
# Check if ADB is accessible
adb version

# Expected output:
# Android Debug Bridge version x.x.x
```

If you see the version, it worked! ✅

## 🔄 After Setup

1. **Close all terminal windows** (Git Bash, CMD, PowerShell)
2. **Open a new terminal**
3. Test ADB: `adb version`
4. Check connected devices: `adb devices`
5. Run your app: `npm run android`

## 🐛 Troubleshooting

### "adb is not recognized" after running script

**Cause:** Terminal hasn't reloaded the PATH
**Fix:** Close ALL terminals and open a fresh one

### "Access Denied" error

**Cause:** Script not run as Administrator
**Fix:** Right-click script → "Run as administrator"

### Path already exists warning

**Good news:** ADB is already in your PATH!
Just close and reopen your terminal.

### Still not working?

Try logging out and back in to Windows, or restart your computer.

## 📱 Next Steps After ADB Setup

1. **Start an Android Emulator** (from Android Studio) OR connect a physical device
2. **Verify device connection:**
   ```bash
   adb devices
   ```
   You should see your device listed

3. **Run the app:**
   ```bash
   npm run android
   ```

## 🔗 Related Files

- [ANDROID_SETUP.md](ANDROID_SETUP.md) - Full Android Studio setup guide
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [README.md](README.md) - Complete documentation

## ⚠️ Important Notes

- You must run the script as **Administrator**
- Changes take effect in **new terminal windows only**
- If you move the platform-tools folder, you'll need to update PATH again
- This modifies **system-wide** PATH (available to all users)

---

**Need help?** See [ANDROID_SETUP.md](ANDROID_SETUP.md) for complete Android development setup.
