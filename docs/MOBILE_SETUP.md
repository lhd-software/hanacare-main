# Mobile App Setup Guide

## Vấn đề: Thiếu thư mục iOS và Android

Project starter kit này chưa có thư mục `ios` và `android` cần thiết cho React Native CLI.

## Giải pháp: Khởi tạo Native Projects

### Cách 1: Tạo từ template (Khuyến nghị)

1. **Tạo project React Native mới tạm thời:**
   ```bash
   cd /tmp
   npx @react-native-community/cli@latest init TempProject --version 0.76.5
   ```

2. **Copy thư mục ios và android:**
   ```bash
   cp -r TempProject/ios /Users/nguyendat/Working/hanacare/hanacare-monorepo/apps/mobile/
   cp -r TempProject/android /Users/nguyendat/Working/hanacare/hanacare-monorepo/apps/mobile/
   ```

3. **Cập nhật package name trong native projects:**
   - iOS: Sửa `PRODUCT_BUNDLE_IDENTIFIER` trong Xcode project
   - Android: Sửa `applicationId` trong `android/app/build.gradle`

4. **Xóa project tạm:**
   ```bash
   rm -rf /tmp/TempProject
   ```

### Cách 2: Sử dụng React Native CLI (Cẩn thận - có thể ghi đè)

```bash
cd apps/mobile
npx @react-native-community/cli@latest init --skip-install --directory . --name HanaCareMobile
```

**Lưu ý:** Cách này có thể ghi đè một số file. Backup trước khi chạy.

### Sau khi có thư mục ios/android:

1. **iOS Setup (macOS only):**
   ```bash
   cd apps/mobile/ios
   pod install
   ```

2. **Android Setup:**
   - Mở Android Studio
   - Import project từ `apps/mobile/android`
   - Sync Gradle

3. **Test:**
   ```bash
   # Terminal 1: Start Metro
   bun run dev:mobile
   
   # Terminal 2: Run iOS
   cd apps/mobile && bun run ios
   
   # Terminal 2: Run Android  
   cd apps/mobile && bun run android
   ```

## Cấu hình đã có

- ✅ `react-native.config.js` - Cấu hình React Native CLI
- ✅ `metro.config.js` - Cấu hình Metro bundler
- ✅ `babel.config.js` - Cấu hình Babel
- ✅ `package.json` - Dependencies đã đầy đủ

## Lưu ý

- Đảm bảo đã cài Xcode (macOS) và Android Studio
- Đảm bảo đã cài CocoaPods: `sudo gem install cocoapods`
- Kiểm tra Java/JDK version cho Android

