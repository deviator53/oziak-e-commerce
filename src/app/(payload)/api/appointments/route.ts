import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import nodemailer from 'nodemailer'
import {
  generateAppointmentWhatsAppMessage,
  generateAppointmentEmailHtml,
  sendWhatsAppMessage,
} from '@/utils/whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, serviceType, date, time, notes } = body

    if (!firstName || !lastName || !email || !phone || !serviceType || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Check slot is still available
    const existing = await payload.find({
      collection: 'appointments',
      where: {
        date: { equals: date },
        time: { equals: time },
        status: { not_equals: 'cancelled' },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: 'This slot has just been booked. Please choose another.' },
        { status: 409 },
      )
    }

    const appointment = await payload.create({
      collection: 'appointments',
      data: {
        firstName,
        lastName,
        email,
        phone,
        serviceType,
        date,
        time,
        notes: notes || '',
        status: 'pending',
      },
    })

    // WhatsApp notification
    if (process.env.ADMIN_WHATSAPP_NUMBER) {
      const message = generateAppointmentWhatsAppMessage({
        firstName,
        lastName,
        email,
        phone,
        serviceType,
        date,
        time,
        notes,
      })
      const url = sendWhatsAppMessage(process.env.ADMIN_WHATSAPP_NUMBER, message)
      // URL is logged server-side; on client the modal can open it if returned
      console.log('WhatsApp notification URL:', url)
    }

    // Email notification
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        const { subject, html } = generateAppointmentEmailHtml({
          firstName,
          lastName,
          email,
          phone,
          serviceType,
          date,
          time,
          notes,
        })
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        })
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject,
          html,
        })
      } catch (emailError) {
        console.error('Failed to send appointment email:', emailError)
      }
    }

    // Build WhatsApp URL to return to client (so it can be opened in browser)
    const whatsappUrl = process.env.ADMIN_WHATSAPP_NUMBER
      ? sendWhatsAppMessage(
          process.env.ADMIN_WHATSAPP_NUMBER,
          generateAppointmentWhatsAppMessage({
            firstName,
            lastName,
            email,
            phone,
            serviceType,
            date,
            time,
            notes,
          }),
        )
      : null

    return NextResponse.json({ success: true, id: appointment.id, whatsappUrl }, { status: 201 })
  } catch (error) {
    console.error('Appointment error:', error)
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
  }
}
