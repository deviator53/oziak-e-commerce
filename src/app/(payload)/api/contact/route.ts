import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message, newsletter } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Create contact submission in Payload
    const contact = await payload.create({
      collection: 'contacts',
      data: {
        firstName,
        lastName,
        email,
        phone: phone || '',
        subject,
        message,
        newsletter: newsletter || false,
        status: 'new',
      },
    })

    // Send email notification (if configured)
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        await sendEmailNotification({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us. We will get back to you soon!',
        id: contact.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 },
    )
  }
}

async function sendEmailNotification(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  // Email sending logic using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const subjectLabels: Record<string, string> = {
    consultation: 'Book a Consultation',
    bespoke: 'Bespoke Tailoring Inquiry',
    'native-wear': 'Native Wear Consultation',
    order: 'Order Inquiry',
    alterations: 'Alterations Service',
    appointment: 'Schedule Appointment',
    general: 'General Question',
    other: 'Other',
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form: ${subjectLabels[data.subject] || data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subjectLabels[data.subject] || data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  })
}
