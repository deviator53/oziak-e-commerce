import type { CollectionConfig } from 'payload'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  lockDocuments: false,
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'date', 'time', 'serviceType', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Bespoke Suit', value: 'bespoke-suit' },
        { label: 'Custom Shirt', value: 'custom-shirt' },
        { label: 'Native Wear', value: 'native-wear' },
        { label: 'Formal Wear', value: 'formal-wear' },
        { label: 'Alterations', value: 'alterations' },
        { label: 'General Consultation', value: 'general' },
      ],
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Date (YYYY-MM-DD)',
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      label: 'Time (HH:MM)',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
    },
  ],
}
