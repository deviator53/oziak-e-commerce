# Upload Functionality Test Checklist

## ✅ Pre-Test Setup

- [x] Media collection configured in `src/collections/Media.ts`
- [x] Vercel Blob Storage plugin added to `src/payload.config.ts`
- [x] `media/` directory created
- [x] Environment variables set in `.env`:
  - `DATABASE_URL`
  - `PAYLOAD_SECRET`
  - `BLOB_READ_WRITE_TOKEN` (for production)

## 🧪 Test Steps

### 1. Start Development Server
```bash
npm run dev
```
Expected: Server starts on http://localhost:3000

### 2. Access Admin Panel
- Navigate to: http://localhost:3000/admin
- Login with admin credentials
- Expected: Admin dashboard loads successfully

### 3. Test Media Upload
- Click on **Media** in sidebar
- Click **Create New** button
- Drag and drop an image OR click to browse
- Fill in **Alt Text** field (required)
- Click **Save**

**Expected Results:**
- ✅ Upload progress indicator appears
- ✅ Image is uploaded successfully
- ✅ Thumbnail is generated and visible
- ✅ File appears in media list
- ✅ Multiple sizes generated (check `media/` folder)

### 4. Test Product Image Upload
- Go to **Products** collection
- Click **Create New** or edit existing product
- Scroll to **Images** section
- Click **Add Image**
- Select uploaded image from media library
- Save product

**Expected Results:**
- ✅ Image is linked to product
- ✅ Image displays in admin preview
- ✅ Product saves successfully

### 5. Test Frontend Display
- Navigate to shop page: http://localhost:3000/shop
- Find the product with uploaded image
- Click to view product details

**Expected Results:**
- ✅ Product image displays correctly
- ✅ Image is responsive (different sizes load)
- ✅ Alt text is present (check with screen reader or inspect element)

### 6. Test Blog Image Upload
- Go to **Blog** collection
- Create new blog post
- Upload **Featured Image**
- Save post

**Expected Results:**
- ✅ Featured image uploads successfully
- ✅ Image displays in blog list
- ✅ Image displays on blog post page

## 🔍 Verification Checks

### Local Development
Check `media/` directory for:
- Original uploaded file
- Generated sizes:
  - `filename-400x300.webp` (thumbnail)
  - `filename-768x1024.webp` (card)
  - `filename-1024xundefined.webp` (tablet)
  - `filename-1920xundefined.webp` (desktop)

### Database
Check media table in PostgreSQL:
```sql
SELECT id, filename, alt, "mimeType", filesize FROM media;
```

### Browser DevTools
- Open DevTools (F12)
- Check **Network** tab during upload
- Verify no errors in **Console** tab
- Check image URLs in **Elements** tab

## 🐛 Common Issues & Solutions

### Issue: Upload button not working
**Solution:** Check browser console for JavaScript errors

### Issue: "Alt text required" error
**Solution:** Fill in the alt text field before saving

### Issue: Images not displaying on frontend
**Solution:** 
1. Check image URL in browser DevTools
2. Verify Next.js image configuration
3. Check file permissions on `media/` directory

### Issue: Slow upload
**Solution:**
1. Check image file size (compress if > 5MB)
2. Check internet connection
3. Verify server is running properly

### Issue: "BLOB_READ_WRITE_TOKEN not found" (Production)
**Solution:** Add token to Vercel environment variables

## 📊 Test Results

| Test | Status | Notes |
|------|--------|-------|
| Media upload | ⬜ | |
| Image sizes generated | ⬜ | |
| Product image link | ⬜ | |
| Frontend display | ⬜ | |
| Blog image upload | ⬜ | |
| Alt text saved | ⬜ | |
| Responsive images | ⬜ | |

## ✅ Success Criteria

All tests should pass with:
- No console errors
- Images display correctly
- Multiple sizes generated
- Alt text present
- Fast upload speed (< 5 seconds for typical image)

## 📝 Notes

- Upload functionality uses Vercel Blob Storage in production
- Local development stores files in `media/` directory
- Images are automatically converted to WebP format
- Maximum file size: 50MB (default Payload limit)
- Supported formats: All image types (JPEG, PNG, WebP, GIF, SVG)

---

**Last Updated:** February 9, 2026
**Status:** ✅ Upload functionality is configured and ready for testing
