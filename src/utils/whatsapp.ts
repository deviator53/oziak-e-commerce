interface OrderItem {
  name: string
  quantity: number
  price: number
  size?: string
  color?: string
  customizations?: string
  image?: string
}

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface ShippingAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface OrderData {
  orderNumber: string
  customerInfo: CustomerInfo
  shippingAddress: ShippingAddress
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export function generateWhatsAppMessage(orderData: OrderData): string {
  const { customerInfo, items, subtotal, shipping, total } = orderData

  let message = `🛍️ *ORDER INQUIRY*\n\n`
  message += `I am interested in these items:\n\n`

  items.forEach((item) => {
    message += `*${item.name}*\n`
    message += `Qty: ${item.quantity} | Size: ${item.size || 'N/A'}\n`
    if (item.color) message += `Color: ${item.color}\n`
    message += `Price: ₦${(item.price * item.quantity).toLocaleString()}\n`
    if (item.image) message += `${item.image}\n`
    message += `\n`
  })

  message += `*Subtotal:* ₦${subtotal.toLocaleString()}\n`
  message += `*Shipping Fee:* ₦${shipping.toLocaleString()}\n`
  message += `*Grand Total:* ₦${total.toLocaleString()}\n\n`

  message += `📋 *Customer Details:*\n`
  message += `Name: ${customerInfo.firstName} ${customerInfo.lastName}\n`
  message += `Phone: ${customerInfo.phone}\n`
  message += `Email: ${customerInfo.email}`

  return message
}

export function sendWhatsAppMessage(phoneNumber: string, message: string): string {
  // Remove any non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '')

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Generate WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`

  return whatsappUrl
}

export function generateEmailContent(orderData: OrderData): { subject: string; html: string } {
  const { orderNumber, customerInfo, shippingAddress, items, subtotal, shipping, tax, total } =
    orderData

  const subject = `New Oziak Order - ${orderNumber}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order - ${orderNumber}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
        .tagline { font-size: 12px; opacity: 0.8; margin-top: 5px; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; }
        .item { background: #fff; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
        .total { background: #000; color: #fff; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">OZIAK</div>
          <div class="tagline">ELEGANCE REDEFINED</div>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>Order Information</h3>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${customerInfo.firstName} ${customerInfo.lastName}</p>
            <p><strong>Email:</strong> ${customerInfo.email}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone}</p>
          </div>

          <div class="section">
            <h3>Shipping Address</h3>
            <p>
              ${shippingAddress.street}<br>
              ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}<br>
              ${shippingAddress.country}
            </p>
          </div>

          <div class="section">
            <h3>Order Items</h3>
            ${items
              .map(
                (item) => `
              <div class="item">
                <h4>${item.name}</h4>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> ₦${item.price.toFixed(2)}</p>
                ${item.size ? `<p><strong>Size:</strong> ${item.size}</p>` : ''}
                ${item.color ? `<p><strong>Color:</strong> ${item.color}</p>` : ''}
                ${item.customizations ? `<p><strong>Customizations:</strong> ${item.customizations}</p>` : ''}
                <p><strong>Subtotal:</strong> ₦${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            `,
              )
              .join('')}
          </div>

          <div class="section">
            <h3>Order Summary</h3>
            <p><strong>Subtotal:</strong> ₦${subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> ₦${shipping.toFixed(2)}</p>
            <p><strong>Tax:</strong> ₦${tax.toFixed(2)}</p>
          </div>

          <div class="total">
            Total: ₦${total.toFixed(2)}
          </div>
        </div>

        <div class="footer">
          <p>This order requires confirmation and payment processing.</p>
          <p>Please contact the customer to arrange payment and confirm delivery details.</p>
        </div>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}

// ── Appointment notifications ──────────────────────────────────────────────

interface AppointmentData {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  date: string
  time: string
  notes?: string
}

const serviceLabels: Record<string, string> = {
  'bespoke-suit': 'Bespoke Suit',
  'custom-shirt': 'Custom Shirt',
  'native-wear': 'Native Wear',
  'formal-wear': 'Formal Wear',
  alterations: 'Alterations',
  general: 'General Consultation',
}

export function generateAppointmentWhatsAppMessage(data: AppointmentData): string {
  const service = serviceLabels[data.serviceType] || data.serviceType
  const [h, m] = data.time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  const formattedTime = `${hour}:${m.toString().padStart(2, '0')} ${period}`

  let message = `📅 *NEW CONSULTATION BOOKING*\n\n`
  message += `*Service:* ${service}\n`
  message += `*Date:* ${new Date(data.date + 'T12:00:00').toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n`
  message += `*Time:* ${formattedTime}\n\n`
  message += `👤 *Client Details:*\n`
  message += `Name: ${data.firstName} ${data.lastName}\n`
  message += `Phone: ${data.phone}\n`
  message += `Email: ${data.email}\n`
  if (data.notes) message += `\n📝 *Notes:* ${data.notes}`

  return message
}

export function generateAppointmentEmailHtml(data: AppointmentData): {
  subject: string
  html: string
} {
  const service = serviceLabels[data.serviceType] || data.serviceType
  const [h, m] = data.time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  const formattedTime = `${hour}:${m.toString().padStart(2, '0')} ${period}`
  const formattedDate = new Date(data.date + 'T12:00:00').toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const subject = `New Consultation Booking – ${data.firstName} ${data.lastName} (${formattedDate})`

  const html = `
    <!DOCTYPE html><html><head><meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
      .container { max-width: 560px; margin: 0 auto; padding: 20px; }
      .header { background: #000; color: #fff; padding: 20px; text-align: center; }
      .logo { font-size: 22px; font-weight: bold; letter-spacing: 3px; }
      .tagline { font-size: 11px; opacity: 0.7; margin-top: 4px; }
      .body { background: #f9f9f9; padding: 24px; }
      .row { margin-bottom: 10px; }
      .label { font-weight: bold; color: #000; }
      .highlight { background: #000; color: #fff; padding: 12px 20px; border-radius: 4px; margin: 20px 0; }
      .footer { text-align: center; font-size: 12px; color: #999; padding: 16px; }
    </style></head>
    <body><div class="container">
      <div class="header">
        <div class="logo">OZIAK</div>
        <div class="tagline">ELEGANCE REDEFINED</div>
      </div>
      <div class="body">
        <h2 style="margin-top:0">New Consultation Booking</h2>
        <div class="highlight">
          📅 ${formattedDate} &nbsp;|&nbsp; 🕐 ${formattedTime}<br>
          <span style="font-size:14px;opacity:0.85">${service}</span>
        </div>
        <div class="row"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
        <div class="row"><span class="label">Email:</span> ${data.email}</div>
        <div class="row"><span class="label">Phone:</span> ${data.phone}</div>
        ${data.notes ? `<div class="row"><span class="label">Notes:</span> ${data.notes}</div>` : ''}
      </div>
      <div class="footer">Log in to your admin panel to confirm or manage this appointment.</div>
    </div></body></html>
  `

  return { subject, html }
}
