# Contact Form Setup Guide

The contact form is now fully functional and integrated with Payload CMS and email notifications.

## Features

✅ Contact form submissions stored in Payload CMS
✅ Email notifications sent to admin
✅ Form validation and error handling
✅ Success/error messages for users
✅ Newsletter opt-in option
✅ Status tracking (New, In Progress, Resolved, Closed)

## Setup Instructions

### 1. Configure Email Settings

Add these environment variables to your `.env.local` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

### 2. Gmail Setup (if using Gmail)

To use Gmail for sending emails:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
4. Use this App Password as `SMTP_PASS` in your `.env.local`

### 3. Database Migration

After adding the Contacts collection, run:

```bash
npm run payload migrate
```

Or restart your development server to auto-generate the database schema.

## How It Works

### Frontend
- Users fill out the contact form at `/contact`
- Form data is validated client-side
- On submit, data is sent to `/api/contact`
- Success/error messages are displayed

### Backend
1. API route receives form data
2. Creates a new contact entry in Payload CMS
3. Sends email notification to admin (if configured)
4. Returns success/error response

### Admin Panel
- View all contact submissions at `/admin/collections/contacts`
- Update status (New → In Progress → Resolved → Closed)
- Add internal notes
- Filter by status, subject, or date

## Testing

### Without Email (Development)
The form will work without email configuration. Submissions will be saved to Payload CMS, but no emails will be sent.

### With Email
1. Configure SMTP settings in `.env.local`
2. Submit a test form
3. Check your admin email for notification
4. Verify submission in Payload admin panel

## Email Notification Format

Admins receive emails with:
- Contact name
- Email address
- Phone number (if provided)
- Subject category
- Message content

## Customization

### Add More Subject Options
Edit `src/collections/Contacts.ts` and `src/components/ContactForm.tsx` to add more subject options.

### Change Email Template
Edit the `sendEmailNotification` function in `src/app/(payload)/api/contact/route.ts`.

### Add Auto-Reply
Modify the API route to send a confirmation email to the customer after submission.

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify API route is accessible at `/api/contact`
- Check network tab for failed requests

### Emails not sending
- Verify SMTP credentials in `.env.local`
- Check server logs for email errors
- Test SMTP connection separately
- Ensure App Password is used (not regular password for Gmail)

### Submissions not appearing in admin
- Verify Contacts collection is registered in `payload.config.ts`
- Check database connection
- Run database migration

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords, not regular passwords
- Keep SMTP credentials secure
- Consider rate limiting for production
