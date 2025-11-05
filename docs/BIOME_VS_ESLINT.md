# Biome vs ESLint - Hướng dẫn cho dự án HanaCare

## Tại sao có ESLint khi đã dùng Biome?

### Tình trạng hiện tại

1. **Root level**: Dùng Biome cho toàn bộ monorepo
2. **Next.js (apps/web)**: Có ESLint config (`.eslintrc.json`) và `next lint`
3. **React Native (apps/mobile)**: Có ESLint trong dependencies nhưng chưa có config

### Lý do có ESLint

#### Next.js
- Next.js 15 tích hợp ESLint và có `next lint` command
- Next.js có các rules đặc biệt cho performance (`core-web-vitals`)
- `next lint` được tích hợp vào build process
- Tuy nhiên, Next.js 16 sẽ deprecated `next lint` và chuyển sang ESLint CLI

#### React Native
- React Native có `@react-native/eslint-config` với rules tối ưu cho mobile
- Có thể cần các rules đặc biệt cho React Native

## Biome có đủ không?

### ✅ Biome có thể đủ cho dự án này vì:

1. **Biome hỗ trợ đầy đủ**:
   - Linting (thay ESLint)
   - Formatting (thay Prettier)
   - Import organization
   - TypeScript support
   - React/JSX rules
   - Performance rules

2. **Ưu điểm của Biome**:
   - Nhanh hơn ESLint (viết bằng Rust)
   - Tất cả trong một tool (không cần Prettier)
   - Cấu hình đơn giản hơn
   - Workspace support tốt

3. **Biome đã cover**:
   - React best practices
   - TypeScript best practices
   - Performance rules
   - Code style consistency

### ❌ Chỗ nào có thể cần ESLint:

1. **Next.js Core Web Vitals**:
   - Biome có thể không có exact rules như `next/core-web-vitals`
   - Nhưng Biome có performance rules tương tự

2. **React Native specific rules**:
   - Các rules đặc biệt cho React Native
   - Nhưng Biome cũng hỗ trợ React Native

3. **Plugin ecosystem**:
   - Nếu cần plugin ESLint đặc biệt mà Biome chưa có
   - Dự án này không có plugin đặc biệt

## Đề xuất giải pháp

### Option 1: Chỉ dùng Biome (Khuyến nghị) ✅

**Ưu điểm**:
- Đơn giản, nhất quán
- Nhanh hơn
- Một tool duy nhất
- Phù hợp với README ("no ESLint/Prettier")

**Cách làm**:
1. Xóa ESLint khỏi `apps/web` và `apps/mobile`
2. Dùng Biome cho tất cả
3. Cấu hình Biome với Next.js và React Native rules

### Option 2: Dùng cả hai (không khuyến nghị)

**Khi nào cần**:
- Nếu có plugin ESLint đặc biệt
- Nếu team đã quen với ESLint rules

**Cách làm**:
- Dùng Biome cho root/shared/api
- Dùng ESLint cho Next.js/React Native
- Cần cấu hình để tránh conflict

## Khuyến nghị cho dự án HanaCare

### ✅ Nên: Chỉ dùng Biome

1. **Xóa ESLint khỏi web và mobile**:
   ```bash
   # Xóa ESLint dependencies
   # Xóa .eslintrc.json
   # Đổi lint script sang Biome
   ```

2. **Cấu hình Biome cho Next.js và React Native**:
   - Thêm Next.js specific rules vào Biome config
   - Thêm React Native specific rules

3. **Cập nhật scripts**:
   - `apps/web/package.json`: `"lint": "biome check ."`
   - `apps/mobile/package.json`: `"lint": "biome check ."`

### Lợi ích:
- ✅ Đơn giản, nhất quán
- ✅ Nhanh hơn
- ✅ Phù hợp với README
- ✅ Dễ maintain
- ✅ Một tool duy nhất cho cả team

## Kết luận

**Biome đủ cho dự án này**. Không cần ESLint trừ khi:
- Có plugin ESLint đặc biệt mà Biome chưa hỗ trợ
- Team yêu cầu rules cụ thể chỉ có trong ESLint

Với dự án HanaCare, **chỉ dùng Biome là đủ và tốt hơn**.

