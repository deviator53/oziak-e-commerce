import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'subject', 'status', 'createdAt'],
    group: 'Communications',
    description: 'Contact form submissions from website visitors',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public submissions
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        description: 'First name of the contact',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        description: 'Last name of the contact',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the contact',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number (optional)',
      },
    },
    {
      name: 'subject',
      type: 'select',
      required: true,
      options: [
        { label: 'Book a Consultation', value: 'consultation' },
        { label: 'Bespoke Tailoring Inquiry', value: 'bespoke' },
        { label: 'Native Wear Consultation', value: 'native-wear' },
        { label: 'Order Inquiry', value: 'order' },
        { label: 'Alterations Service', value: 'alterations' },
        { label: 'Schedule Appointment', value: 'appointment' },
        { label: 'General Question', value: 'general' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Subject of the inquiry',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Message content',
      },
    },
    {
      name: 'newsletter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Opted in for newsletter',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Status of the inquiry',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes (not visible to customer)',
      },
    },
  ],
}
