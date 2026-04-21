import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  generateWhatsAppMessage,
  sendWhatsAppMessage,
  generateEmailContent,
} from '@/utils/whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, shippingAddress, billingAddress, items, subtotal, shipping, tax, total } =
      body

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Generate order number
    const orderNumber = `OZ${Date.now().toString().slice(-8)}`

    // Create order in database
    // Strip the product relationship field to avoid validation errors
    // (product name/price are stored directly on each item)
    const sanitizedItems = items.map(({ product: _product, ...item }: any) => item)

    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        customerInfo,
        shippingAddress,
        billingAddress,
        items: sanitizedItems,
        subtotal,
        shipping,
        tax,
        total,
        status: 'pending',
        paymentStatus: 'pending',
      },
    })

    // Get settings for WhatsApp and email
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let settings: any = {}
    try {
      settings = await payload.findGlobal({ slug: 'settings' })
    } catch {
      // settings not configured yet, continue without notifications
    }

    const orderData = {
      orderNumber,
      customerInfo,
      shippingAddress,
      items,
      subtotal,
      shipping,
      tax,
      total,
    }

    // Send WhatsApp notification if phone number is configured
    const whatsappPhone = settings.contact?.whatsapp || process.env.WHATSAPP_NUMBER
    let whatsappUrl = null
    if (whatsappPhone) {
      const whatsappMessage = generateWhatsAppMessage(orderData)
      whatsappUrl = sendWhatsAppMessage(whatsappPhone, whatsappMessage)

      // Update order to mark WhatsApp as sent
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          whatsappSent: true,
        },
      })
    }

    // Generate email content
    const emailContent = generateEmailContent(orderData)

    // In a real implementation, you would send the email here
    // For now, we'll just mark it as ready to send
    if (settings.contact?.email) {
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: {
          emailSent: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber,
        total,
      },
      whatsappUrl,
      emailContent,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
