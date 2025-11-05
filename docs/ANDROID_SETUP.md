# Android Setup Guide

## Vấn đề: Thiếu Java Runtime

Android build cần Java Development Kit (JDK) để chạy Gradle.

## Cách cài đặt Java trên macOS

### Option 1: Sử dụng Homebrew (Khuyến nghị)

```bash
# Cài JDK 17 (LTS) - phù hợp với React Native
brew install openjdk@17

# Link vào system
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Set JAVA_HOME
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

### Option 2: Sử dụng Homebrew với JDK 21 (mới hơn)

```bash
brew install openjdk@21
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
source ~/.zshrc
```

### Option 3: Download từ Oracle/Adoptium

1. Truy cập: https://adoptium.net/
2. Download JDK 17 hoặc 21 cho macOS
3. Cài đặt và set JAVA_HOME

## Verify Installation

```bash
# Check Java version
java -version

# Check JAVA_HOME
echo $JAVA_HOME

# List available Java versions
/usr/libexec/java_home -V
```

## Sau khi cài Java

1. **Restart terminal** hoặc chạy:
   ```bash
   source ~/.zshrc
   ```

2. **Verify Gradle có thể chạy:**
   ```bash
   cd apps/mobile/android
   ./gradlew --version
   ```

3. **Chạy Android app:**
   ```bash
   cd apps/mobile
   bun run android
   ```

## Lưu ý

- React Native 0.76 yêu cầu JDK 17 hoặc cao hơn
- JAVA_HOME phải được set đúng
- Nếu dùng Android Studio, nó có thể có JDK riêng - có thể dùng JDK đó

## Troubleshooting

Nếu vẫn lỗi sau khi cài Java:

1. **Check gradle.properties:**
   ```bash
   cd apps/mobile/android
   # Thêm vào gradle.properties nếu cần:
   # org.gradle.java.home=/path/to/jdk
   ```

2. **Check Android Studio JDK:**
   ```bash
   # Android Studio thường có JDK ở:
   # /Applications/Android Studio.app/Contents/jbr/Contents/Home
   ```

3. **Set JAVA_HOME manually:**
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   ```

