import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Media',
    description: 'Upload and manage images for products, blog posts, and pages',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO (required)',
        placeholder: 'Describe the image for screen readers',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption displayed with the image',
        placeholder: 'Add a caption (optional)',
      },
    },
    {
      name: 'focalPoint',
      type: 'point',
      admin: {
        description: 'Set the focal point for image cropping',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    crop: true,
    focalPoint: true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate alt text from filename if not provided
        if (!data.alt && data.filename) {
          data.alt = data.filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
            .replace(/\b\w/g, (l: string) => l.toUpperCase()) // Capitalize first letter of each word
        }
        return data
      },
    ],
  },
}
