import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Oziak',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Elegance Redefined',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
          admin: {
            description: 'WhatsApp number with country code (e.g., +1234567890)',
          },
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      fields: [
        {
          name: 'freeShippingThreshold',
          type: 'number',
          defaultValue: 100,
        },
        {
          name: 'standardShippingCost',
          type: 'number',
          defaultValue: 10,
        },
        {
          name: 'expressShippingCost',
          type: 'number',
          defaultValue: 25,
        },
      ],
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
        { label: 'NGN (₦)', value: 'NGN' },
      ],
      defaultValue: 'USD',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Oziak - Elegance Redefined',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "Discover bespoke men's clothing at Oziak. Custom tailoring and ready-to-wear pieces that redefine elegance.",
        },
        {
          name: 'keywords',
          type: 'text',
          defaultValue: "bespoke menswear, custom tailoring, men's fashion, elegant clothing",
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
