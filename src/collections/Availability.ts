import type { CollectionConfig } from 'payload'

export const Availability: CollectionConfig = {
  slug: 'availability',
  admin: {
    useAsTitle: 'label',
    description: 'Set your available days and times for consultations',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Availability Settings',
    },
    {
      name: 'slotDurationMinutes',
      type: 'number',
      label: 'Slot Duration (minutes)',
      required: true,
      defaultValue: 60,
    },
    {
      name: 'availableDays',
      type: 'array',
      label: 'Available Days',
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: [
            { label: 'Monday', value: '1' },
            { label: 'Tuesday', value: '2' },
            { label: 'Wednesday', value: '3' },
            { label: 'Thursday', value: '4' },
            { label: 'Friday', value: '5' },
            { label: 'Saturday', value: '6' },
            { label: 'Sunday', value: '0' },
          ],
        },
        {
          name: 'startTime',
          type: 'text',
          label: 'Start Time (HH:MM)',
          required: true,
          defaultValue: '09:00',
        },
        {
          name: 'endTime',
          type: 'text',
          label: 'End Time (HH:MM)',
          required: true,
          defaultValue: '17:00',
        },
      ],
    },
  ],
}
