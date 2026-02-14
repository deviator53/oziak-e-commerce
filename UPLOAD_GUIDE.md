# Oziak E-commerce - Upload Functionality Guide

## Overview
The Oziak e-commerce platform uses Payload CMS with Vercel Blob Storage for handling media uploads. This guide explains how the upload system works and how to test it.

## Configuration

### 1. Storage Setup
The project is configured to use **Vercel Blob Storage** for production uploads:

```typescript
// src/payload.config.ts
plugins: [
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
  }),
]
```

### 2. Environment Variables
Required environment variables in `.env`:

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/oziak_db

# Payload Secret
PAYLOAD_SECRET=your-secret-key-here

# Vercel Blob Storage (for production)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here
```

### 3. Local Development
For local development, files are stored in the `media/` directory. The system automatically:
- Creates responsive image sizes (thumbnail, card, tablet, desktop)
- Converts images to WebP format for optimization
- Generates alt text from filename if not provided

## Media Collection Features

### Image Sizes Generated
1. **Thumbnail**: 400x300px - Used in admin panel
2. **Card**: 768x1024px - Product cards and listings
3. **Tablet**: 1024px width - Tablet displays
4. **Desktop**: 1920px width - Full desktop displays

### Upload Settings
- **Accepted formats**: All image types (JPEG, PNG, WebP, GIF, etc.)
- **Output format**: WebP (85% quality)
- **Focal point**: Enabled for smart cropping
- **Crop tool**: Available in admin

## Testing Upload Functionality

### Step 1: Access Admin Panel
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to: `http://localhost:3000/admin`
3. Log in with your admin credentials

### Step 2: Upload Media
1. Go to **Media** collection in the sidebar
2. Click **Create New**
3. Drag and drop an image or click to browse
4. Fill in the **Alt Text** (required for SEO)
5. Optionally add a **Caption**
6. Click **Save**

### Step 3: Verify Upload
Check that:
- ✅ Image appears in the Media collection list
- ✅ Thumbnail is generated and visible
- ✅ File is saved in `media/` directory (local) or Vercel Blob (production)
- ✅ Multiple sizes are generated
- ✅ Alt text is saved

### Step 4: Use in Products
1. Go to **Products** collection
2. Create or edit a product
3. In the **Images** field, click **Add Image**
4. Select from existing media or upload new
5. Save the product
6. View the product on the frontend to verify image display

## Common Upload Locations

### Products
- **Product Images**: Main product photos with multiple angles
- **Featured Image**: Primary product image for listings
- Path: Products → Images array

### Blog Posts
- **Featured Image**: Main blog post image
- **Content Images**: Inline images in rich text
- Path: Blog → Featured Image

### Pages
- **Hero Images**: Large banner images
- **Content Images**: Page content images
- Path: Pages → Content blocks

## Troubleshooting

### Upload Not Working
1. **Check environment variables**:
   ```bash
   # Verify .env file has required variables
   DATABASE_URL=...
   PAYLOAD_SECRET=...
   ```

2. **Check media directory permissions**:
   ```bash
   # Ensure media directory exists and is writable
   ls -la media/
   ```

3. **Check file size limits**:
   - Default Payload limit: 50MB
   - Vercel Blob limit: Depends on plan

4. **Check browser console**:
   - Open DevTools (F12)
   - Look for upload errors in Console tab
   - Check Network tab for failed requests

### Images Not Displaying
1. **Check image URLs**:
   - Local: Should be `/media/filename.webp`
   - Production: Should be Vercel Blob URL

2. **Check Next.js image domains**:
   ```typescript
   // next.config.mjs
   images: {
     domains: ['your-blob-domain.vercel-storage.com'],
   }
   ```

3. **Verify image field in code**:
   ```typescript
   // Check if image is properly accessed
   typeof product.images[0].image === 'object' && 'url' in product.images[0].image
   ```

## Production Deployment

### Vercel Blob Storage Setup
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Storage** tab
4. Create a **Blob Store**
5. Copy the `BLOB_READ_WRITE_TOKEN`
6. Add to environment variables in Vercel

### Environment Variables in Vercel
Add these in Project Settings → Environment Variables:
- `DATABASE_URL` - Your production database
- `PAYLOAD_SECRET` - Secure random string
- `BLOB_READ_WRITE_TOKEN` - From Vercel Blob Store

## Best Practices

### Image Optimization
1. **Upload high-quality images**: System will optimize automatically
2. **Use descriptive filenames**: Helps with auto-generated alt text
3. **Always add alt text**: Required for accessibility and SEO
4. **Use focal point**: For better cropping on different sizes

### Organization
1. **Use descriptive alt text**: "Navy Blue Wool Suit Front View"
2. **Add captions when needed**: Additional context for images
3. **Delete unused media**: Keep media library clean
4. **Organize by category**: Use consistent naming conventions

### Performance
1. **WebP format**: Automatically used for smaller file sizes
2. **Responsive images**: Multiple sizes generated automatically
3. **Lazy loading**: Implemented in frontend components
4. **CDN delivery**: Vercel Blob provides global CDN

## API Usage

### Uploading via API
```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('alt', 'Image description')

const response = await fetch('/api/media', {
  method: 'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Accessing Media
```typescript
// Get media by ID
const media = await payload.findByID({
  collection: 'media',
  id: mediaId,
})

// Get all media
const { docs: mediaFiles } = await payload.find({
  collection: 'media',
  limit: 10,
})
```

## Support

If you encounter issues:
1. Check this guide first
2. Review Payload CMS documentation: https://payloadcms.com/docs
3. Check Vercel Blob documentation: https://vercel.com/docs/storage/vercel-blob
4. Review error logs in terminal and browser console

## Summary

✅ **Upload functionality is fully configured and working**
✅ **Local development**: Files stored in `media/` directory
✅ **Production**: Files stored in Vercel Blob Storage
✅ **Automatic optimization**: WebP conversion, responsive sizes
✅ **Accessibility**: Required alt text, focal point support
✅ **Integration**: Works with Products, Blog, Pages collections

The upload system is production-ready and follows best practices for performance, accessibility, and user experience.
