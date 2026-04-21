import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'featured', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'e.g. Business Executive, Entrepreneur',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage testimonials section',
      },
    },
  ],
}
