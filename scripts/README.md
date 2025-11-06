# Image Migration: Uxpilot → Cloudflare R2

Script để download tất cả hình ảnh từ các trang trong cloud uxpilot và upload lên Cloudflare R2.

## Cài đặt

1. Copy file environment:
```bash
cp scripts/.env.example scripts/.env
```

2. Cấu hình environment variables trong `scripts/.env`:
- `UXPILOT_BASE_URL`: URL API của uxpilot
- `UXPILOT_API_KEY`: API key để truy cập uxpilot
- `R2_ACCESS_KEY_ID`: Access key của Cloudflare R2
- `R2_SECRET_ACCESS_KEY`: Secret key của Cloudflare R2
- `R2_BUCKET`: Tên bucket R2 để lưu images
- `R2_ENDPOINT`: R2 endpoint URL

## Cài đặt dependencies

Script cần AWS SDK để upload lên R2:

```bash
# Thêm AWS SDK v3 cho R2
bun add @aws-sdk/client-s3
```

## Sử dụng

### Chạy script hoàn chỉnh
```bash
bun run scripts/migrate-images.ts
```

### Hoặc dùng với npm script
Thêm vào package.json:
```json
{
  "scripts": {
    "migrate-images": "bun run scripts/migrate-images.ts"
  }
}
```

Rồi chạy:
```bash
bun run migrate-images
```

## Quy trình hoạt động

1. **Fetch pages**: Lấy tất cả pages từ uxpilot API
2. **Extract images**: Phân tích content và extract URLs của images
3. **Download images**: Download tất cả images về thư mục `downloads/`
4. **Upload to R2**: Upload images lên Cloudflare R2 bucket

## Cấu hình tùy chỉnh

### Custom page filtering
Nếu muốn chỉ migrate pages cụ thể, sửa trong script:

```typescript
// Trong migrate-images.ts, thay đổi getPages()
const specificPageIds = ['page1', 'page2', 'page3']
const pages = await Promise.all(
  specificPageIds.map(id =>
    fetch(`${this.uxpilotConfig.baseUrl}/api/pages/${id}`, {
      headers: { 'Authorization': `Bearer ${this.uxpilotConfig.apiKey}` }
    }).then(r => r.json())
  )
)
```

### Custom image filtering
Nếu muốn filter theo loại ảnh:

```typescript
// Trong extractImageUrls()
const allowedExtensions = ['jpg', 'jpeg', 'png'] // chỉ lấy các định dạng này
```

### Custom R2 structure
Nếu muốn tổ chức images theo thư mục:

```typescript
// Trong uploadToR2()
const key = `images/${new Date().getFullYear()}/${image.filename}`
```

## Troubleshooting

### Lỗi API credentials
- Kiểm tra UXPILOT_API_KEY có hợp lệ không
- Đảm bảo R2 keys có quyền upload

### Lỗi rate limiting
- Thêm delays giữa requests:
```typescript
await new Promise(resolve => setTimeout(resolve, 1000)) // 1s delay
```

### Lỗi memory với nhiều images
- Process theo batch thay vì tất cả cùng lúc:
```typescript
const batchSize = 50
for (let i = 0; i < imageUrls.length; i += batchSize) {
  const batch = imageUrls.slice(i, i + batchSize)
  // process batch
}
```

## Monitoring

Script sẽ log progress:
- Số pages tìm được
- Số images tìm thấy
- Số images download thành công
- Số images upload lên R2 thành công

## Security Notes

- Không commit API keys vào git
- Sử dụng environment variables
- Giới hạn quyền của R2 keys (chỉ cần upload/delete)
- Xóa thư mục downloads sau khi hoàn thành nếu cần