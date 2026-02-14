interface OrderItem {
  name: string
  quantity: number
  price: number
  size?: string
  color?: string
  customizations?: string
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
  const { orderNumber, customerInfo, shippingAddress, items, subtotal, shipping, tax, total } =
    orderData

  let message = `🎩 *OZIAK - New Order Received*\n\n`
  message += `📋 *Order Details:*\n`
  message += `Order Number: ${orderNumber}\n`
  message += `Date: ${new Date().toLocaleDateString()}\n\n`

  message += `👤 *Customer Information:*\n`
  message += `Name: ${customerInfo.firstName} ${customerInfo.lastName}\n`
  message += `Email: ${customerInfo.email}\n`
  message += `Phone: ${customerInfo.phone}\n\n`

  message += `📍 *Shipping Address:*\n`
  message += `${shippingAddress.street}\n`
  message += `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}\n`
  message += `${shippingAddress.country}\n\n`

  message += `🛍️ *Order Items:*\n`
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Quantity: ${item.quantity}\n`
    message += `   Price: ₦${item.price.toFixed(2)}\n`
    if (item.size) message += `   Size: ${item.size}\n`
    if (item.color) message += `   Color: ${item.color}\n`
    if (item.customizations) message += `   Customizations: ${item.customizations}\n`
    message += `   Subtotal: ₦${(item.price * item.quantity).toFixed(2)}\n\n`
  })

  message += `💰 *Order Summary:*\n`
  message += `Subtotal: ₦${subtotal.toFixed(2)}\n`
  message += `Shipping: ₦${shipping.toFixed(2)}\n`
  message += `Tax: ₦${tax.toFixed(2)}\n`
  message += `*Total: ₦${total.toFixed(2)}*\n\n`

  message += `⚡ *Action Required:*\n`
  message += `Please confirm this order and provide payment instructions.\n\n`
  message += `#OziakOrder #BespokeStyle #EleganceRedefined`

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
