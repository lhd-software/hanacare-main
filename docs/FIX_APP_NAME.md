# Fix App Name: TempProject → HanaCare

## Vấn đề

iOS và Android projects đang dùng tên "TempProject" (từ template) nhưng `app.json` có tên "HanaCare". Điều này gây ra lỗi:
```
"TempProject" has not been registered
```

## Cách sửa

### 1. iOS - Đổi tên trong Xcode project

Cần đổi tên trong nhiều file iOS. Cách nhanh nhất là dùng Xcode:

1. Mở `apps/mobile/ios/TempProject.xcworkspace` trong Xcode
2. Đổi tên project:
   - Click vào project name "TempProject" ở sidebar
   - Press Enter và đổi thành "HanaCare"
   - Xcode sẽ hỏi rename, chọn "Rename"

Hoặc đổi thủ công:
- `apps/mobile/ios/TempProject.xcodeproj/project.pbxproj` - Tìm và thay "TempProject"
- `apps/mobile/ios/Podfile` - Đổi target name
- `apps/mobile/ios/TempProject/Info.plist` - Update bundle identifier nếu cần

### 2. Android - Đổi tên package

1. `apps/mobile/android/settings.gradle` - Đổi `rootProject.name = 'TempProject'` → `'HanaCare'`
2. `apps/mobile/android/app/src/main/java/com/tempproject/MainActivity.kt` - Đổi package name
3. `apps/mobile/android/app/src/main/res/values/strings.xml` - Đổi app_name
4. Di chuyển thư mục package: `com/tempproject` → `com/hanacare`

### 3. Podfile

Đổi `target 'TempProject'` thành `target 'HanaCare'` và chạy:
```bash
cd apps/mobile/ios
pod install
```

## Script tự động (TODO)

Có thể tạo script để tự động đổi tên, nhưng cách an toàn nhất là dùng Xcode cho iOS.

